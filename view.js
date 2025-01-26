const basePath = app.vault.adapter.basePath

// Import paths
delete global.require.cache[
  global.require.resolve(`${basePath}\\Calendario\\env.js`)
]

const {
  utilsPath,
  monthViewPath,
  buttonsPath,
} = require(`${basePath}\\Calendario\\env.js`)

// Clear imports cache
delete global.require.cache[global.require.resolve(utilsPath)]

delete global.require.cache[global.require.resolve(monthViewPath)]

delete global.require.cache[global.require.resolve(buttonsPath)]

// Imports
const { setButtons } = require(buttonsPath)

const { capitalizeFirstLetter } = require(utilsPath)

const { setMonthView } = require(monthViewPath)

// Functions
const main = function () {
  // console.time('calendar')
  console.log('Comienza --------------------')
  const { tasks, view, options } = input

  const rootNodeElement = dv.el('div', '', {
    cls: `tasksCalendar ${options}`,
    attr: {
      id: 'tasksCalendar',
      view,
      style: 'position:relative;-webkit-user-select:none!important',
    },
  })

  // Si startPosition no se define, simplemente se genera un objeto moment que representa la fecha y hora actual
  // data(1) ajustará esa fecha al primer día del mes correspondiente a la fecha actual
  // Fecha posicionada en el día 1 del mes
  let firstDateOfMonth = moment().date(1)
  let selectedList = moment().date(1)
  // Fecha posicionada en el primer día de la semana
  let selectedWeek = moment().startOf('week')

  let selectedDate
  // Dependiendo de la vista que se elija
  const viewSelected = `selected${capitalizeFirstLetter(view)}`

  if (viewSelected === 'selectedMonth') {
    selectedDate = firstDateOfMonth
  } else {
    if (viewSelected === 'selectedWeek') {
      selectedDate = selectedWeek
    } else {
      selectedDate = selectedList
    }
  }

  // selected date creo que siempre sera el primer día del mes, tanto para month o week
  setButtons(rootNodeElement, selectedDate, tasks)
  setMonthView(selectedDate, rootNodeElement, tasks)
  // console.timeEnd('calendar')
}

main()
