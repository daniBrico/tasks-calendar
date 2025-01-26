const basePath = app.vault.adapter.basePath

// Import paths
delete global.require.cache[
  global.require.resolve(`${basePath}\\Calendario\\env.js`)
]

const {
  templatesPath,
  monthViewPath,
} = require(`${basePath}\\Calendario\\env.js`)

// Clear imports cache
delete global.require.cache[global.require.resolve(templatesPath)]

delete global.require.cache[global.require.resolve(monthViewPath)]

// Imports
const { getButtons } = require(templatesPath)

const { setMonthView } = require(monthViewPath)

// Functions
const previousOrNextEvents = function (
  activeView,
  date,
  VIEW_TYPES,
  className
) {
  const actions = {
    [VIEW_TYPES.WEEK]: () => moment(date).add(7, 'days').startOf('week'),
  }

  if (className === 'previous') {
    actions[VIEW_TYPES.MONTH] = () => moment(date).subtract(1, 'months')
    actions[VIEW_TYPES.LIST] = () => moment(date).subtract(1, 'months')
  } else {
    actions[VIEW_TYPES.MONTH] = () => moment(date).add(1, 'months')
    actions[VIEW_TYPES.LIST] = () => moment(date).add(1, 'months')
  }

  return actions[activeView]()
}

const currentEvents = function (activeView, VIEW_TYPES) {
  const actions = {
    [VIEW_TYPES.MONTH]: () => moment().date(1),
    [VIEW_TYPES.WEEK]: () => moment().startOf('week'),
    [VIEW_TYPES.LIST]: () => moment().date(1),
  }

  return actions[activeView]()
}

const setButtons = function (rootNodeElement, date, tasks) {
  // Tipos de vistas
  const VIEW_TYPES = {
    MONTH: 'month',
    WEEK: 'week',
    LIST: 'list',
  }

  rootNodeElement.querySelector('span').innerHTML = getButtons()

  rootNodeElement.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      let activeView = rootNodeElement.getAttribute('view')

      if (button.className === 'previous' || button.className === 'next') {
        date = previousOrNextEvents(
          activeView,
          date,
          VIEW_TYPES,
          button.className
        )

        setMonthView(date, rootNodeElement, tasks)
      }

      if (button.className === 'current') {
        const todayDate = moment()

        if (todayDate.isSame(date, 'month')) return

        date = currentEvents(activeView, VIEW_TYPES)
        setMonthView(date, rootNodeElement, tasks)
      }
    })
  })
}

// Export
module.exports = { setButtons }
