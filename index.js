const basePath = app.vault.adapter.basePath

// Import
const {
  utilsPath,
  appPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { reloadImportsCache } = require(utilsPath)
const { initializeApp } = require(appPath)

// Functions
const main = function () {
  console.log('Comienza --------------------')
  reloadImportsCache(`${basePath}\\Calendario`)
  const { tasks, view, options } = input

  initializeApp({ tasks, view, options, dv })
}

main()
