const basePath = app.vault.adapter.basePath

// Import paths
delete global.require.cache[
  global.require.resolve(`${basePath}\\Calendario\\calendar-env.js`)
]

const { svgIconsPath } = require(`${basePath}\\Calendario\\calendar-env.js`)

// Clear imports cache
delete global.require.cache[global.require.resolve(svgIconsPath)]

// Imports
const {
  arrowLeftIcon,
  arrowRightIcon,
  filterIcon,
  monthIcon,
  weekIcon,
  listIcon,
  calendarCheckIcon,
} = require(svgIconsPath)

// Functions
const getButtons = () => `
        <div class="buttons">
          <button class="filter">
            ${filterIcon}
          </button>
          <button class="listView" title="List">
            ${listIcon}
          </button>
          <button class="monthView" title="Month">
            ${monthIcon}
          </button>
          <button class="weekView" title="Week">
            ${weekIcon}
          </button>
          <button class="current"></button>
          <button class="previous">
            ${arrowLeftIcon}
          </button>
          <button class="next">
            ${arrowRightIcon}
          </button>
          <button class="statistic" data-percentage="">${calendarCheckIcon}</button>
        </div>
      `

// Genera y retorna el contenido HTML (en forma de texto) para un día
const getDayCell = ({ className, weekday, cellName, cellContent }) => `
        <div class="cell ${className}" data-weekday="${weekday}">
          <a class="internal-link cellName">
            ${cellName}
          </a>
          ${cellContent ? `<div class="cellContent">${cellContent}</div>` : ''}
        </div>
      `

const getWeekRow = ({ weekNumber, yearNumber, weekContent }) => `
        <div class="wrapper">
          <div class="wrapperButton" data-week="${weekNumber}" data-year="${yearNumber}">
            W${weekNumber}
          </div>
          ${weekContent}
        </div>
      `

const getGridMonth = ({ monthName, weeksWrappers }) => `
        <div class="wrappers" data-month="${monthName}">
          ${weeksWrappers}
        </div>
      `

const getTaskTemplate = ({
  taskLine,
  cls,
  style,
  title,
  note,
  icon,
  relative,
  taskText,
}) => `
        <a class="internal-link" href="${taskLine}">
          <div class="task ${cls}" style="${style}" title="${title}">
            <div class="inner">
              <div class="note">${note}</div>
              <div class="icon">${icon}</div>
              <div class="description" data-relative="${relative}">${taskText}</div>
            </div>
          </div>
        </a>
      `

// Export
module.exports = {
  getButtons,
  getDayCell,
  getWeekRow,
  getGridMonth,
  getTaskTemplate,
}
