// Functions
const previousOrNextEvents = function (params) {
  const { activeView, date, className } = params

  const value = className === 'previous' ? -1 : 1

  return activeView === 'month' || activeView === 'list'
    ? moment(date).add(value, 'months')
    : moment(date).add(7, 'days').startOf('week')
}

const currentEvent = (activeView) =>
  activeView === 'month' || activeView === 'list'
    ? moment().date(1)
    : moment().startOf('week')

module.exports = {
  previousOrNextEvents,
  currentEvent,
}
