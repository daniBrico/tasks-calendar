// Retorna la metadata de un archivo.md en base a una ruta
// Recibe una ruta relativa, no es necesario una ruta absoluta para usar ese método
// Si no la encuentra retorna null
const getNoteMetadata = function (pathFile) {
  const dataviewjsApi = app.plugins.plugins.dataview.api

  const metadata = dataviewjsApi.page(pathFile)

  if (!metadata) return null

  return metadata
}

module.exports = {
  getNoteMetadata,
}
