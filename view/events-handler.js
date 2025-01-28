const basePath = app.vault.adapter.basePath

// Imports
const { VIEW_TYPES } = require(`${basePath}\\Calendario\\env.js`)

// Functions
const previousOrNextEvents = function (params) {
  const { activeView, date, className } = params

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

const currentEvent = function (activeView) {
  const actions = {
    [VIEW_TYPES.MONTH]: () => moment().date(1),
    [VIEW_TYPES.WEEK]: () => moment().startOf('week'),
    [VIEW_TYPES.LIST]: () => moment().date(1),
  }

  return actions[activeView]()
}

module.exports = {
  previousOrNextEvents,
  currentEvent,
}
