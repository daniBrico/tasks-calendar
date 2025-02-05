// imports
const path = require('path')

// Variables
const WEEK_START_DAY = 1

// paths
const basePath = app.vault.adapter.basePath
const rootPathProject = path.join(basePath, 'Tasks Calendar/src')

// root directory
const appPath = path.join(rootPathProject, 'app.js')

// config directory
const settingsManagerPath = path.join(
  rootPathProject,
  'config/settings-manager.js'
)
const envPath = path.join(rootPathProject, 'config/env.js')

// events directory
const toolbarEventsHandlerPath = path.join(
  rootPathProject,
  'events/toolbar-events-handler.js'
)
const eventsPath = path.join(rootPathProject, 'events/events-controller.js')

// file directory
const notePath = path.join(rootPathProject, 'file/note.js')
const tasksPath = path.join(rootPathProject, 'file/tasks.js')

// resources directory
const svgIconsPath = path.join(rootPathProject, 'resources/svg-icons.js')
const templatesPath = path.join(rootPathProject, 'resources/templates.js')

// utils directory
const utilsPath = path.join(rootPathProject, 'utils/utils.js')

// view directory
const monthViewPath = path.join(rootPathProject, 'view/month-view.js')
const weekViewPath = path.join(rootPathProject, 'view/week-view.js')
const viewHandlerPath = path.join(rootPathProject, 'view/view-handler.js')

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
