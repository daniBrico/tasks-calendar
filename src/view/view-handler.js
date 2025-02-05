const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

const { templatesPath, monthViewPath, weekViewPath } = require(envPath)

// Imports
const { getButtonsTemplate } = require(templatesPath)
const { setMonthView } = require(monthViewPath)
const { setWeekView } = require(weekViewPath)

const createRootNode = async function (params) {
  const { view, options, dv } = params

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

  return rootNodeElement
}

const setToolBar = (rootNodeElement) =>
  (rootNodeElement.querySelector('span').innerHTML = getButtonsTemplate())

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
  createRootNode,
  setToolBar,
  setView,
  removeExistingView,
}
