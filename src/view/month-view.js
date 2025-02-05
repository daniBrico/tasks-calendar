const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

// Imports
const { utilsPath, templatesPath, tasksPath } = require(envPath)

const { createHTMLElement } = require(utilsPath)

const {
  getDayCell,
  getWeekRow,
  getGridMonth,
  getWeekDayCell,
} = require(templatesPath)

const { WEEK_START_DAY } = require(envPath)

const {
  getTasksCurrentAndAdjacentMonths,
  getTasksForDay,
  createTasksTemplate,
} = require(tasksPath)

// Functions
const displayWeekDaysHeader = (params) => {
  const { firstDateOfMonth, rootNodeElement } = params

  const currentDate = moment()
  const currentDayIndex = parseInt(currentDate.format('d'))

  const weekDaysHeaderContainer = createHTMLElement({
    elementType: 'div',
    classes: ['weekDaysHeaderContainer'],
  })

  weekDaysHeaderContainer.innerHTML = `<div></div>`

  let targetDayIndex
  let weekDayName
  let gridHeadClass

  let firstDayOfMonthIx = getFirstDayOfMonthIx(firstDateOfMonth)

  let h = 0 - firstDayOfMonthIx + WEEK_START_DAY

  for (h; h < 7 - firstDayOfMonthIx + WEEK_START_DAY; h++) {
    targetDayIndex = parseInt(
      firstDateOfMonth.clone().add(h, 'days').format('d')
    )
    weekDayName = firstDateOfMonth.clone().add(h, 'days').format('ddd')

    // El valor today pareciera que no lo utiliza luego, no se para que lo agrega. Tener en cuenta.
    if (
      firstDateOfMonth.isSame(currentDate, 'month') &&
      currentDayIndex === targetDayIndex
    )
      gridHeadClass = 'today'

    weekDaysHeaderContainer.innerHTML += getWeekDayCell(
      targetDayIndex,
      weekDayName,
      gridHeadClass
    )
  }

  const divElement = createHTMLElement({
    elementType: 'div',
    classes: ['grid'],
  })
  divElement.appendChild(weekDaysHeaderContainer)

  rootNodeElement.querySelector('span').appendChild(divElement)
}

// Genera y retorna el contenido HTML (en formato texto) correspondiente a un día
const generateDayCell = (dateIterator, isSameMonth, isToday, cellContent) => {
  const isFirstDayOfMonth = parseInt(dateIterator.format('D')) === 1

  const cls = [
    isFirstDayOfMonth ? 'newMonth' : '',
    !isSameMonth ? 'diferentMonth' : '',
    isToday ? 'today' : '',
  ]

  const cellData = {
    cls: cls.join(' '),
    weekDay: dateIterator.format('d'),
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

  let tasksForDay
  let cellContent
  let dayCell

  // Recorro los 7 días de la semana
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    dateIterator = weekStart.clone().add(dayOffset, 'day')
    tasksForDay = getTasksForDay(dateIterator, tasks)

    if (tasksForDay.length > 0) cellContent = createTasksTemplate(tasksForDay)

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
  const { rootNodeElement, firstDateOfMonth, tasks } = params
  const weeksWrappers = []

  let firstDayOfMonthIx = getFirstDayOfMonthIx(firstDateOfMonth)
  // La vista comenzará a mostrar los días a partir de startDayOffSet
  const startDayOffset = WEEK_START_DAY - firstDayOfMonthIx

  const tasksCurrentAndAdjacentMonths = getTasksCurrentAndAdjacentMonths(
    firstDateOfMonth,
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
      firstDateOfMonth,
      tasksCurrentAndAdjacentMonths
    )

    weeksWrappers.push(getWeekRow(weekData))
  }

  // Generar y añadir el grid al DOM
  const gridContent = getGridMonth({
    monthName: firstDateOfMonth.format('MMM'),
    weeksWrappers: weeksWrappers.join(''),
  })

  rootNodeElement
    .querySelector('.weekDaysHeaderContainer')
    .insertAdjacentHTML('afterend', gridContent)
}

const setMonthView = (targetDate, rootNodeElement, tasks) => {
  // targetDate: Objeto fecha posicionado en el primer día del mes

  const firstDateOfMonth = targetDate.clone().startOf('month')

  rootNodeElement.querySelector('button.current').innerHTML = `
    <span>${targetDate.format('MMMM')}</span>
    <span>${targetDate.format('YYYY')}</span>
  `

  displayWeekDaysHeader({
    firstDateOfMonth,
    rootNodeElement,
  })

  displayDayGrid({
    rootNodeElement,
    firstDateOfMonth,
    tasks,
  })

  rootNodeElement.setAttribute('data-view', 'month')
}

// Export
module.exports = {
  setMonthView,
}
