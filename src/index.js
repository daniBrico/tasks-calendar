const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

// Import
const { utilsPath, appPath } = require(envPath)
const { reloadImportsCache } = require(utilsPath)
const { initializeApp } = require(appPath)

// Functions
const main = function () {
  console.log('Comienza --------------------')
  reloadImportsCache(`${basePath}\\Calendario`)
  const { view, options } = input
  let tasks = input.tasks

  if (!tasks)
    tasks = dv
      .pages()
      .file.where(
        (f) =>
          f.frontmatter.estado === `regular` ||
          f.tags.includes(`#tareas-generales`) ||
          f.frontmatter.estado === `cursando`
      ).tasks

  initializeApp({ tasks, view, options, dv })
}

main()
