const basePath = app.vault.adapter.basePath

// Imports
const {
  envPath,
  templatesPath,
  tasksPath,
  utilsPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const {
  getTasksForDay,
  getTasksCurrentAndAdjacentMonths,
  createTasksTemplate,
} = require(tasksPath)
const { WEEK_START_DAY } = require(envPath)
const { getDayCell } = require(templatesPath)
const { createHTMLElement } = require(utilsPath)

const generateDayCell = (dateIterator, cellContent) => {
  const isFirstDayOfMonth = parseInt(dateIterator.format('D')) === 1
  const todayDate = moment()

  // Tengo que revisar para qué usa estas clases
  const cls = [
    dateIterator.isSame(todayDate, 'day') ? 'today' : '',
    // dateIterator.isBefore(todayDate) ? 'beforeToday' : '',
    // dateIterator.isAfter(todayDate) ? 'afterToday' : '',
  ]

  const cellData = {
    cls: cls.join(' '),
    weekDay: dateIterator.format('d'),
    cellName: isFirstDayOfMonth
      ? dateIterator.format('ddd, D. MMM')
      : dateIterator.format('ddd D.'),
    cellContent,
  }

  return getDayCell(cellData)
}

const setWeekView = function (targetDate, rootNodeElement, tasks) {
  rootNodeElement.querySelector('button.current').innerHTML = `
    <span>${targetDate.format('YYYY')}</span>
    <span>${targetDate.format('[W]w')}</span>
  `

  const currentDayIndex = parseInt(targetDate.format('d'))
  const startDayOffset = 0 - currentDayIndex + WEEK_START_DAY
  const weekCells = []
  const tasksCurrentAndAdjacentMonths = getTasksCurrentAndAdjacentMonths(
    targetDate,
    tasks
  )

  let dateIterator
  let tasksForDay
  let cellContent
  let dayCell

  for (i = startDayOffset; i < 7 - currentDayIndex + WEEK_START_DAY; i++) {
    dateIterator = targetDate.clone().add(i, 'days')
    tasksForDay = getTasksForDay(dateIterator, tasksCurrentAndAdjacentMonths)

    if (tasksForDay.length > 0) cellContent = createTasksTemplate(tasksForDay)

    dayCell = generateDayCell(dateIterator, cellContent)
    weekCells.push(dayCell)

    cellContent = null
  }

  const gridContent = createHTMLElement({
    elementType: 'div',
    classes: ['grid'],
    attributes: {
      name: 'data-week',
      value: `${targetDate.format('[W]w')}`,
    },
  })

  gridContent.innerHTML = weekCells.join('')
  rootNodeElement.querySelector('span').appendChild(gridContent)
  rootNodeElement.setAttribute('data-view', 'week')
}

module.exports = {
  setWeekView,
}
