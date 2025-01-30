const basePath = app.vault.adapter.basePath

// Imports
const {
  templatesPath,
  notePath,
  utilsPath,
  svgIconsPath,
} = require(`${basePath}\\Calendario\\config\\env.js`)

const { getTaskTemplate } = require(templatesPath)

const { getNoteMetadata } = require(notePath)

const { transColor } = require(utilsPath)

const { dueIcon } = require(svgIconsPath)

// Functions

// Sobre todas las tareas recibidas, devuelve aquellas que están dentro del mes actual, anterior y siguiente, de la fecha recibida como parámetro
// Solo funciona para due
const getTasksCurrentAndAdjacentMonths = function (date, tasks) {
  const lastMonthDate = date.clone().subtract(1, 'months')
  const nextMonthDate = date.clone().add(1, 'months')

  const tasksCurrentAndAdjacentMonths = tasks.values.filter((task) => {
    if (!task.due) return false

    if (
      date.isSame(task.due.toString(), 'month') ||
      lastMonthDate.isSame(task.due.toString(), 'month') ||
      nextMonthDate.isSame(task.due.toString(), 'month')
    )
      return true
  })

  return tasksCurrentAndAdjacentMonths
}

// Retorna una arreglo con las tareas de un día en particular
// Solo funciona para due
const getTasksForDay = (date, tasks) =>
  tasks.filter((task) => date.isSame(task.due.toString(), 'day'))

// Genera y retorna todo el contenido HTML (en forma de texto) de todas las tareas recibidas
const createTasksTemplate = function (tasks) {
  // HTML info
  let cellTasksContent = ''
  let cls = 'noNoteIcon'
  let style
  let lighter = 25
  let darker = -40

  // Task info
  let taskText
  let taskLine
  let taskPath
  let relative = ''

  // Note info
  let noteFileName
  let noteColor
  let noteMetadata

  for (const task of tasks) {
    // El propósito de esto es asegurarse de que cualquier comilla simple dentro del texto se convierta en su equivalente HTML (&apos;)
    taskText = task.text.replace("'", '&apos;')
    taskPath = task.link.path.replace("'", '&apos;')

    taskLine = task.header.subpath
      ? `${taskPath}#${task.header.subpath}`
      : taskPath

    noteMetadata = getNoteMetadata(taskPath)
    noteFileName = noteMetadata.file.name

    if (noteMetadata.color) noteColor = noteMetadata.color

    if (task.due) relative = moment(task.due).fromNow()

    // Revisar esto
    if (noteColor) {
      style = `--task-background: ${noteColor}33;--task-color: ${noteColor};--dark-task-text-color: ${transColor(
        noteColor,
        darker
      )};--light-task-text-color: ${transColor(noteColor, lighter)}`
    } else {
      style = `--task-background:#7D7D7D33;--task-color:#7D7D7D;--dark-task-text-color: ${transColor(
        '#7D7D7D',
        darker
      )};--light-task-text-color: ${transColor('#7D7D7D', lighter)}`
    }

    cellTasksContent += getTaskTemplate({
      taskLine,
      cls,
      style,
      title: `${noteFileName}: ${taskText}`,
      note: noteFileName,
      icon: dueIcon,
      relative,
      taskText,
    })
  }

  return cellTasksContent
}

module.exports = {
  getTasksCurrentAndAdjacentMonths,
  getTasksForDay,
  createTasksTemplate,
}
