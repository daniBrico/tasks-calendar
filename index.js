const basePath = app.vault.adapter.basePath

// Import
const {
  // viewHandlerPath,
  utilsPath,
  eventsPath,
  viewHandlerPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

// const { initialView } = require(viewHandlerPath)
const { reloadImportsCache } = require(utilsPath)
const { setToolbarEvents } = require(eventsPath)
const { setView } = require(viewHandlerPath)

// Functions
const initialView = async function (params) {
  const { view, tasks, options, dv } = params

  const date = moment()

  const rootNodeElement = dv.el('div', '', {
    cls: `tasksCalendar ${options}`,
    attr: {
      id: 'tasksCalendar',
      'data-view': view,
      style: 'position:relative;-webkit-user-select:none!important',
    },
  })

  const cssFile = await app.metadataCache.getFirstLinkpathDest(
    'style.css',
    basePath
  )
  const cssContent = await app.vault.cachedRead(cssFile)
  const styleElement = await global.createEl('style', { text: cssContent })
  rootNodeElement.insertAdjacentElement('beforebegin', styleElement)

  setToolbarEvents(rootNodeElement, date, tasks)
  setView(view, date, rootNodeElement, tasks)
}

const main = function () {
  console.log('Comienza --------------------')
  reloadImportsCache(`${basePath}\\Calendario`)
  const { tasks, view, options } = input

  initialView({ tasks, view, options, dv })
}

main()
