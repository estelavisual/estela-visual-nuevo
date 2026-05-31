import sharp from 'sharp'
import { readdir, stat, rename } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = './public'
const MAX_WIDTH = 1920
const QUALITY = 82

const EXCLUIR = ['logo.png', 'og-image.jpg', 'ebook-mockup.png', 'favicon.svg', 'icons.svg']

async function optimizar() {
  const archivos = await readdir(PUBLIC_DIR)
  const imagenes = archivos.filter(f => {
    const ext = extname(f).toLowerCase()
    return ['.jpg', '.jpeg', '.png'].includes(ext) && !EXCLUIR.includes(f)
  })

  console.log(`\nOptimizando ${imagenes.length} imágenes...\n`)

  let totalAntes = 0
  let totalDespues = 0

  for (const archivo of imagenes) {
    const ruta = join(PUBLIC_DIR, archivo)
    const rutaTemp = ruta + '.tmp'
    const ext = extname(archivo).toLowerCase()

    const statAntes = await stat(ruta)
    totalAntes += statAntes.size

    try {
      let pipeline = sharp(ruta).resize({ width: MAX_WIDTH, withoutEnlargement: true })

      if (ext === '.png') {
        pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 8 })
      } else {
        pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
      }

      await pipeline.toFile(rutaTemp)

      const statDespues = await stat(rutaTemp)
      totalDespues += statDespues.size

      const antes = (statAntes.size / 1024 / 1024).toFixed(2)
      const despues = (statDespues.size / 1024 / 1024).toFixed(2)
      const ahorro = Math.round((1 - statDespues.size / statAntes.size) * 100)

      await rename(rutaTemp, ruta)
      console.log(`✓ ${archivo.padEnd(30)} ${antes}MB → ${despues}MB  (-${ahorro}%)`)
    } catch (err) {
      console.error(`✗ ${archivo}: ${err.message}`)
    }
  }

  const antesTotal = (totalAntes / 1024 / 1024).toFixed(1)
  const despuesTotal = (totalDespues / 1024 / 1024).toFixed(1)
  const ahorroTotal = Math.round((1 - totalDespues / totalAntes) * 100)

  console.log(`\n─────────────────────────────────────────`)
  console.log(`Total: ${antesTotal}MB → ${despuesTotal}MB  (-${ahorroTotal}% de ahorro)`)
  console.log(`─────────────────────────────────────────\n`)
}

optimizar()
