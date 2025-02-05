const path = require('path')
const basePath = app.vault.adapter.basePath
const envPath = path.join(basePath, 'Tasks Calendar/src/config/env.js')

// Import
const { svgIconsPath } = require(envPath)

const {
  arrowLeftIcon,
  arrowRightIcon,
  filterIcon,
  monthIcon,
  weekIcon,
  calendarCheckIcon,
} = require(svgIconsPath)

// Functions
const getButtonsTemplate = () => `
        <div class="buttons">
          <button class="filter">
            ${filterIcon}
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
const getDayCell = ({ cls, weekDay, cellName, cellContent }) => {
  const className = `cell ${cls}`.trim()

  return `
          <div class="${className}" data-weekday="${weekDay}">
            <a class="internal-link cellName">
              ${cellName}
            </a>
            ${
              cellContent ? `<div class="cellContent">${cellContent}</div>` : ''
            }
          </div>
        `
}

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

const getWeekDayCell = (targetDayIndex, weekDayName, gridHeadClass = '') => {
  const className = `gridHead ${gridHeadClass}`.trim()

  return `
          <div class="${className}" data-weekday="${targetDayIndex}">
            ${weekDayName}
          </div>
        `
}

// Export
module.exports = {
  getButtonsTemplate,
  getDayCell,
  getWeekRow,
  getGridMonth,
  getTaskTemplate,
  getWeekDayCell,
}
