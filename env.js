const WEEK_START_DAY = 1

const VIEW_TYPES = {
  MONTH: 'month',
  WEEK: 'week',
  LIST: 'list',
}

let defaultView = 'month'

// Paths
const basePath = app.vault.adapter.basePath
const rootPathProject = `${basePath}\\Calendario`

// File directory
const notePath = `${rootPathProject}\\file\\note.js`
const tasksPath = `${rootPathProject}\\file\\tasks.js`

// Resources directory
const svgIconsPath = `${rootPathProject}\\resources\\svg-icons.js`
const templatesPath = `${rootPathProject}\\resources\\templates.js`

// Utils directory
const utilsPath = `${rootPathProject}\\utils\\utils.js`

// View directory
const monthViewPath = `${rootPathProject}\\view\\month-view.js`
const viewHandlerPath = `${rootPathProject}\\view\\view-handler.js`
const eventsHandlerPath = `${rootPathProject}\\view\\events-handler.js`

// Env
const envPath = `${rootPathProject}\\env.js`

module.exports = {
  WEEK_START_DAY,
  notePath,
  tasksPath,
  svgIconsPath,
  templatesPath,
  utilsPath,
  monthViewPath,
  viewHandlerPath,
  eventsHandlerPath,
  envPath,
  VIEW_TYPES,
}
