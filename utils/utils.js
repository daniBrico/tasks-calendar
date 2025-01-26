// Functions
const createHTMLElement = (data) => {
  const { elementType, classes, attributes, content } = data

  const el = document.createElement(elementType)

  if (classes) {
    if (Array.isArray(classes)) {
      el.classList.add(...classes)
    } else {
      el.classList.add(classes)
    }
  }

  if (attributes) el.setAttribute(attributes.name, attributes.value)

  if (content) el.textContent = content

  return el
}

const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1)

// Revisar esta función
const transColor = function (color, percent) {
  let num = parseInt(color.replace('#', ''), 16)
  let amt = Math.round(2.55 * percent)
  let R = (num >> 16) + amt
  let B = ((num >> 8) & 0x00ff) + amt
  let G = (num & 0x0000ff) + amt

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

// Export
module.exports = {
  createHTMLElement,
  capitalizeFirstLetter,
  transColor,
}
