const basePath = app.vault.adapter.basePath

// Imports
const {
  monthViewPath,
  weekViewPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { setMonthView } = require(monthViewPath)
const { setWeekView } = require(weekViewPath)

// Functions
const setView = function (view, date, rootNodeElement, tasks) {
  removeExistingView(rootNodeElement)

  if (view === 'month') setMonthView(date, rootNodeElement, tasks)

  if (view === 'week') setWeekView(date, rootNodeElement, tasks)
}

const removeExistingView = function (rootNodeElement) {
  if (rootNodeElement.querySelector(`#tasksCalendar .grid`))
    rootNodeElement.querySelector(`#tasksCalendar .grid`).remove()
}

module.exports = {
  setView,
}
