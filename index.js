const basePath = app.vault.adapter.basePath

// Import
const {
  viewHandlerPath,
  utilsPath,
} = require(`${basePath}\\Calendario\\env.js`)

const { initialView } = require(viewHandlerPath)
const { reloadImportsCache } = require(utilsPath)

// Functions
const main = async function () {
  console.log('Comienza --------------------')
  const { tasks, view, options } = input

  initialView({ tasks, view, options, dv })
  reloadImportsCache(`${basePath}\\Calendario`)
}

main()
