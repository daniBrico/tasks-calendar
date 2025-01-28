const basePath = app.vault.adapter.basePath

// Import
const {
  viewHandlerPath,
  utilsPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { initialView } = require(viewHandlerPath)
const { reloadImportsCache } = require(utilsPath)

// Functions
const main = function () {
  console.log('Comienza --------------------')
  reloadImportsCache(`${basePath}\\Calendario`)
  const { tasks, view, options } = input

  initialView({ tasks, view, options, dv })
}

main()
