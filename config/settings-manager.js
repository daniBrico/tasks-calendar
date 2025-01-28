const fs = require('fs').promises
const path = require('path')

const CONFIG_PATH = path.join(
  app.vault.adapter.basePath,
  'Calendario/config/settings.json'
)

const getSettings = async function () {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8')

    const config = JSON.parse(data)

    return config
  } catch (err) {
    console.error('Error al leer o parsear el archivo de configuración:', err)
    return null // Opcional: devuelve null o un valor predeterminado en caso de error
  }
}

module.exports = {
  getSettings,
}
