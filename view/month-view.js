const basePath = app.vault.adapter.basePath

// Imports
const {
  utilsPath,
  templatesPath,
  tasksPath,
  envPath,
} = require(`${basePath}\\Calendario\\env.js`)

const { createHTMLElement } = require(utilsPath)

const { getDayCell, getWeekRow, getGridMonth } = require(templatesPath)

const { WEEK_START_DAY } = require(envPath)

const {
  getTasksCurrentAndAdjacentMonths,
  getTasksForDay,
  createTasksTemplate,
} = require(tasksPath)

// Functions
const displayWeekDaysHeader = (params) => {
  const { targetDate, rootNodeElement } = params

  const currentDate = moment()
  const currentDayIndex = parseInt(currentDate.format('d'))

  const weekDaysHeaderWrapp = createHTMLElement({
    elementType: 'div',
    classes: 'gridHeads',
  })

  weekDaysHeaderWrapp.innerHTML = `
    <div class="gridHead"></div>
  `
  let targetDayIndex
  let weekDayName
  let weekDayCell

  let firstDayOfMonthIx = getFirstDayOfMonthIx(targetDate)

  let h = 0 - firstDayOfMonthIx + WEEK_START_DAY

  for (h; h < 7 - firstDayOfMonthIx + WEEK_START_DAY; h++) {
    targetDayIndex = parseInt(targetDate.clone().add(h, 'days').format('d'))
    weekDayName = targetDate.clone().add(h, 'days').format('ddd')

    weekDayCell = createHTMLElement({
      elementType: 'div',
      classes: 'gridHead',
      attributes: {
        name: 'data-weekday',
        value: targetDayIndex,
      },
      content: weekDayName,
    })

    // El valor today pareciera que no lo utiliza luego, no se para que lo agrega. Tener en cuenta.
    if (
      targetDate.isSame(currentDate, 'month') &&
      currentDayIndex === targetDayIndex
    )
      weekDayCell.classList.add('today')

    weekDaysHeaderWrapp.appendChild(weekDayCell)
  }

  const divElement = createHTMLElement({ elementType: 'div', classes: 'grid' })
  divElement.appendChild(weekDaysHeaderWrapp)
  rootNodeElement.querySelector('span').appendChild(divElement)
  rootNodeElement.setAttribute('data-view', 'month')
}

// Genera y retorna el contenido HTML (en formato texto) correspondiente a un día
const generateDayCell = (dateIterator, isSameMonth, isToday, cellContent) => {
  const isFirstDayOfMonth = parseInt(dateIterator.format('D')) === 1

  const className = [
    isFirstDayOfMonth ? 'newMonth' : '',
    !isSameMonth ? 'diferentMonth' : '',
    isToday ? 'today' : '',
  ]

  const cellData = {
    className: className.join(' '),
    weekday: dateIterator.format('d'),
    cellName: isFirstDayOfMonth
      ? dateIterator.format('D. MMM')
      : dateIterator.format('D'),
    cellContent,
  }

  return getDayCell(cellData)
}

// Genera y retorna un arreglo (weekCells), junto a otra información, el contenido de toda una semana
const generateWeek = (startDayOffset, firstDateOfMonth, tasks) => {
  const weekCells = []
  const weekStart = firstDateOfMonth.clone().add(startDayOffset, 'day')
  const todayDate = moment()

  let dateIterator
  let isSameMonth
  let isToday

  let tasksFromDay
  let cellContent
  let dayCell

  // Recorro los 7 días de la semana
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    dateIterator = weekStart.clone().add(dayOffset, 'day')

    tasksFromDay = getTasksForDay(dateIterator, tasks)

    if (tasksFromDay.length > 0) cellContent = createTasksTemplate(tasksFromDay)

    isSameMonth = dateIterator.isSame(firstDateOfMonth, 'month')
    isToday = dateIterator.isSame(todayDate, 'day')

    dayCell = generateDayCell(dateIterator, isSameMonth, isToday, cellContent)

    weekCells.push(dayCell)

    cellContent = null
  }

  return {
    weekNumber: weekStart.format('w'),
    yearNumber: weekStart.format('YYYY'),
    weekContent: weekCells.join(''),
  }
}

// Número del día de la semana donde comienza el mes obtenido en targetDate
// Dom (0), Lun (1), Mar (2), Miér (3), Jue (4), Vie (5), Sáb (6)
// Si es Dom, será igual a 7
const getFirstDayOfMonthIx = (targetDate) =>
  parseInt(targetDate.format('d')) === 0 ? 7 : parseInt(targetDate.format('d'))

const displayDayGrid = (params) => {
  const { rootNodeElement, targetDate, tasks } = params
  const weeksWrappers = []

  let firstDayOfMonthIx = getFirstDayOfMonthIx(targetDate)
  // La vista comenzará a mostrar los días a partir de startDayOffSet
  const startDayOffset = WEEK_START_DAY - firstDayOfMonthIx

  const tasksCurrentAndAdjacentMonths = getTasksCurrentAndAdjacentMonths(
    targetDate,
    tasks
  )

  let weekOffset
  let weekData

  // Recorro las 6 semanas que voy a pintar
  for (let week = 0; week < 6; week++) {
    weekOffset = startDayOffset + week * 7

    // Genero cada una de las semanas con sus respectivos días
    weekData = generateWeek(
      weekOffset,
      targetDate,
      tasksCurrentAndAdjacentMonths
    )

    weeksWrappers.push(getWeekRow(weekData))
  }

  // Generar y añadir el grid al DOM
  const gridContent = getGridMonth({
    monthName: targetDate.format('MMM'),
    weeksWrappers: weeksWrappers.join(''),
  })
  rootNodeElement
    .querySelector('.gridHeads')
    .insertAdjacentHTML('afterend', gridContent)
}

// Si voy a hacer una vista
function removeExistingView(rootNodeElement) {
  if (rootNodeElement.querySelector(`#tasksCalendar .grid`))
    rootNodeElement.querySelector(`#tasksCalendar .grid`).remove()

  // if (rootNodeElement.querySelector(`#tasksCalendar .grid`)) {
  //   rootNodeElement.querySelector(`#tasksCalendar .grid`).remove()
  // } else if (rootNodeElement.querySelector(`#tasksCalendar .list`)) {
  //   rootNodeElement.querySelector(`#tasksCalendar .list`).remove()
  // }
}

const setMonthView = (targetDate, rootNodeElement, tasks) => {
  // targetDate: Objeto fecha posicionado en el primer día del mes
  removeExistingView(rootNodeElement)

  rootNodeElement.querySelector('button.current').innerHTML = `
    <span>${targetDate.format('MMMM')}</span>
    <span>${targetDate.format('YYYY')}</span>
    `
  displayWeekDaysHeader({
    targetDate,
    rootNodeElement,
  })
  displayDayGrid({
    rootNodeElement,
    targetDate,
    tasks,
  })
}

// Export
module.exports = {
  setMonthView,
}
