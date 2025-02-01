// imports
const path = require('path')

const WEEK_START_DAY = 1

// paths
const basePath = app.vault.adapter.basePath
const rootPathProject = `${basePath}\\Calendario`

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
const eventsHandlerPath = `${rootPathProject}\\view\\events-handler.js`
const viewHandlerPath = `${rootPathProject}\\view\\view-handler.js`
const eventsPath = `${rootPathProject}\\view\\events.js`

// config directory
const settingsManagerPath = path.join(
  rootPathProject,
  'config/settings-manager.js'
)
const envPath = `${rootPathProject}\\config\\env.js`

module.exports = {
  WEEK_START_DAY,
  notePath,
  tasksPath,
  svgIconsPath,
  templatesPath,
  utilsPath,
  monthViewPath,
  weekViewPath,
  viewHandlerPath,
  eventsPath,
  eventsHandlerPath,
  envPath,
  settingsManagerPath,
}
