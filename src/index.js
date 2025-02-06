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
  reloadImportsCache(path.join(basePath, 'Tasks Calendar'))
  const options = 'style1'
  const { view } = input
  let { tasks, tags } = input

  if (!tasks) {
    if (tags) {
      tasks = dv
        .pages()
        .where((page) =>
          tags.some((tag) => page.file.tags && page.file.tags.includes(tag))
        ).file.tasks
    }
  }

  initializeApp({ tasks, view, options, dv })
}

main()
