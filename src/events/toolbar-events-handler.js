const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

// Imports
const { viewHandlerPath } = require(envPath)
const { setView } = require(viewHandlerPath)

// Variables para mantener el estado
let currentDate = null
let activeView = null

// Función para inicializar el estado
const initialize = (initialDate) => {
  currentDate = moment(initialDate)
  activeView = 'month'
}

// Función para establecer la vista
const setViewEventHandler = (view, rootNodeElement, tasks) => {
  const previousView = activeView
  activeView = view

  if (previousView === activeView) return

  if (view === 'week')
    setView(view, currentDate.clone(), rootNodeElement, tasks)

  if (view === 'month')
    setView(view, currentDate.clone().startOf('month'), rootNodeElement, tasks)
}

const prevOrNextEventHandler = (direction, rootNodeElement, tasks) => {
  const amount = direction === 'next' ? 1 : -1

  if (activeView === 'month') {
    currentDate.add(amount, 'months').startOf('month')
  } else {
    currentDate.add(amount, 'weeks').startOf('week')
  }

  setView(activeView, currentDate.clone(), rootNodeElement, tasks)
}

const currentEventHandler = (rootNodeElement, tasks) => {
  currentDate = moment()

  setView(activeView, currentDate.clone(), rootNodeElement, tasks)
}

module.exports = {
  initialize,
  setViewEventHandler,
  prevOrNextEventHandler,
  currentEventHandler,
}
