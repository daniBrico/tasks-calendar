const basePath = app.vault.adapter.basePath

const {
  templatesPath,
  // eventsHandlerPath,
  viewHandlerPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

// Imports
const { getButtonsTemplate } = require(templatesPath)
// const {
//   prevOrNextEventHandler,
//   currentEventHandler,
// } = require(eventsHandlerPath)

const { setView } = require(viewHandlerPath)

// Functions
const CalendarState = {
  currentDate: null,
  activeView: null,

  initialize(initialDate) {
    this.currentDate = moment(initialDate)
    this.activeView = 'month'
  },

  setView(view) {
    const previousView = this.activeView
    this.activeView = view

    // Ajustar la fecha según la transición de vista
    // Al cambiar de mes a semana, mantener la fecha actual
    if (previousView === 'month' && view === 'week')
      return this.currentDate.clone()

    // Al cambiar de semana a mes, volver al mes de la fecha original
    if (previousView === 'week' && view === 'month')
      return this.currentDate.clone().startOf('month')

    return this.currentDate.clone()
  },

  navigate(direction) {
    const amount = direction === 'next' ? 1 : -1

    this.activeView === 'month'
      ? this.currentDate.add(amount, 'months').startOf('month')
      : this.currentDate.add(amount, 'weeks').startOf('week')

    return this.currentDate.clone()
  },

  goToToday() {
    this.currentDate = moment()

    return this.currentDate.clone()
  },
}

const setToolbarEvents = function (rootNodeElement, initialDate, tasks) {
  const calendar = Object.create(CalendarState)
  calendar.initialize(initialDate)
  rootNodeElement.querySelector('span').innerHTML = getButtonsTemplate()

  rootNodeElement.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      let dateToRender

      switch (button.className) {
        case 'previous':
        case 'next':
          dateToRender = calendar.navigate(button.className)
          setView(calendar.activeView, dateToRender, rootNodeElement, tasks)
          break

        case 'current':
          dateToRender = calendar.goToToday()
          setView(calendar.activeView, dateToRender, rootNodeElement, tasks)
          break

        case 'weekView':
          if (calendar.activeView === 'week') return
          dateToRender = calendar.setView('week')
          setView('week', dateToRender, rootNodeElement, tasks)
          break

        case 'monthView':
          if (calendar.activeView === 'month') return
          dateToRender = calendar.setView('month')
          setView('month', dateToRender, rootNodeElement, tasks)
          break
      }
    })
  })
}

module.exports = {
  setToolbarEvents,
}
