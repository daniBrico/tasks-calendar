// Functions
const prevOrNextEventHandler = function (params) {
  const { activeView, date, className } = params

  const value = className === 'previous' ? -1 : 1

  return activeView === 'month'
    ? date.add(value, 'months')
    : date.add(7, 'days').startOf('week')
}

const currentEventHandler = () => moment().startOf('month')

module.exports = {
  prevOrNextEventHandler,
  currentEventHandler,
}
