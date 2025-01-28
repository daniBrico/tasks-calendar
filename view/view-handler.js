const basePath = app.vault.adapter.basePath

// Imports
const {
  monthViewPath,
  templatesPath,
  eventsHandlerPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { setMonthView } = require(monthViewPath)
const { getButtonsTemplate } = require(templatesPath)
const { previousOrNextEvents, currentEvent } = require(eventsHandlerPath)

// Functions
const setView = function (view, date, rootNodeElement, tasks) {
  if (view === 'month') setMonthView(date, rootNodeElement, tasks)
}

const initialView = async function (params) {
  const { view, tasks, options, dv } = params

  const validViews = ['month', 'week', 'list']
  const viewSelected = validViews.includes(view.toLowerCase()) ? view : 'month'

  const date =
    viewSelected === 'month' || viewSelected === 'list'
      ? moment().startOf('month')
      : moment().startOf('week')

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

  setToolbar(rootNodeElement, date, tasks)
  setView(view, date, rootNodeElement, tasks)
}

const setToolbar = function (rootNodeElement, date, tasks) {
  rootNodeElement.querySelector('span').innerHTML = getButtonsTemplate()

  const activeView = rootNodeElement.dataset.view

  rootNodeElement.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.className === 'previous' || button.className === 'next') {
        date = previousOrNextEvents({
          activeView,
          date,
          className: button.className,
        })

        setView(activeView, date, rootNodeElement, tasks)
      }

      if (button.className === 'current') {
        const todayDate = moment()

        if (todayDate.isSame(date, 'month')) return

        date = currentEvent(activeView)

        setView(activeView, date, rootNodeElement, tasks)
      }
    })
  })
}

module.exports = {
  initialView,
  setView,
}
