// imports
const path = require('path')

const WEEK_START_DAY = 1

// paths
const basePath = app.vault.adapter.basePath
const rootPathProject = `${basePath}\\Calendario`

// root directory
const appPath = `${rootPathProject}\\app.js`

// config directory
const settingsManagerPath = path.join(
  rootPathProject,
  'config/settings-manager.js'
)
const envPath = `${rootPathProject}\\config\\env.js`

// events directory
const toolbarEventsHandlerPath = `${rootPathProject}\\events\\toolbar-events-handler.js`
const eventsPath = `${rootPathProject}\\events\\events-controller.js`

// file directory
const notePath = `${rootPathProject}\\file\\note.js`
const tasksPath = `${rootPathProject}\\file\\tasks.js`

// resources directory
const svgIconsPath = `${rootPathProject}\\resources\\svg-icons.js`
const templatesPath = `${rootPathProject}\\resources\\templates.js`

// utils directory
const utilsPath = `${rootPathProject}\\utils\\utils.js`

// view directory
const monthViewPath = `${rootPathProject}\\view\\month-view.js`
const weekViewPath = `${rootPathProject}\\view\\week-view.js`
const viewHandlerPath = `${rootPathProject}\\view\\view-handler.js`

module.exports = {
  WEEK_START_DAY,
  appPath,
  notePath,
  tasksPath,
  svgIconsPath,
  templatesPath,
  utilsPath,
  monthViewPath,
  weekViewPath,
  toolbarEventsHandlerPath,
  eventsPath,
  viewHandlerPath,
  settingsManagerPath,
  envPath,
}
