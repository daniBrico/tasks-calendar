const basePath = app.vault.adapter.basePath

// Imports
const {
  viewHandlerPath,
  eventsPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { createRootNode, setToolBar, setView } = require(viewHandlerPath)
const { setToolbarEvents } = require(eventsPath)

// Functions
const initializeApp = async function (params) {
  const { tasks, view, options, dv } = params

  const rootNodeElement = await createRootNode({ view, options, dv })

  const date = moment()

  setToolBar(rootNodeElement)
  setToolbarEvents(rootNodeElement, date, tasks)
  setView(view, date, rootNodeElement, tasks)
}

module.exports = {
  initializeApp,
}
