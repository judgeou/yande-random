import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { yande_image, compress_image } from '../lib/index.mjs'

const streamPipeline = promisify(pipeline)

export default async function handler (req, res) {
  const { url, format } = req.query

  if (url) {
    let image = await yande_image(url)
    let mime = compress_image(image, res, format)

    let d = new Date()
    d.setMonth(d.getMonth + 1)

    res.setHeader('content-type', mime)
    res.setHeader('Cache-Control', 'public, max-age=2592000')
    res.setHeader('Expires', d.toUTCString())
  } else {
    res.status(404).json("url miss")
  }
}