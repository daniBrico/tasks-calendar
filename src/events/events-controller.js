const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

const { toolbarEventsHandlerPath } = require(envPath)

const {
  initialize,
  setViewEventHandler,
  prevOrNextEventHandler,
  currentEventHandler,
} = require(toolbarEventsHandlerPath)

const setToolbarEvents = function (rootNodeElement, initialDate, tasks) {
  initialize(initialDate)

  rootNodeElement.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      switch (button.className) {
        case 'previous':
        case 'next':
          prevOrNextEventHandler(button.className, rootNodeElement, tasks)
          break

        case 'current':
          currentEventHandler(rootNodeElement, tasks)
          break

        case 'weekView':
          setViewEventHandler('week', rootNodeElement, tasks)
          break

        case 'monthView':
          setViewEventHandler('month', rootNodeElement, tasks)
          break
      }
    })
  })
}

module.exports = {
  setToolbarEvents,
}
