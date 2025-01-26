const WEEK_START_DAY = 1

// Paths
const basePath = app.vault.adapter.basePath
const rootPathProject = `${basePath}\\Calendario`

// File directory
const notePath = `${rootPathProject}\\file\\calendar-note.js`
const tasksPath = `${rootPathProject}\\file\\calendar-tasks.js`

// Resources directory
const svgIconsPath = `${rootPathProject}\\resources\\calendar-svg-icons.js`
const templatesPath = `${rootPathProject}\\resources\\calendar-templates.js`

// Utils directory
const utilsPath = `${rootPathProject}\\utils\\calendar-utils.js`

// View directory
const buttonsPath = `${rootPathProject}\\view\\calendar-buttons.js`
const monthViewPath = `${rootPathProject}\\view\\calendar-month-view.js`

// Env
const envPath = `${rootPathProject}\\calendar-env.js`

module.exports = {
  WEEK_START_DAY,
  notePath,
  tasksPath,
  svgIconsPath,
  templatesPath,
  utilsPath,
  buttonsPath,
  monthViewPath,
  envPath,
}
