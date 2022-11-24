import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { yande_image, compress_image } from '../lib/index.mjs'

const streamPipeline = promisify(pipeline)

export default async function handler (req, res) {
  const { url, format } = req.query

  if (url) {
    let image = await yande_image(url)
    let mime = compress_image(image, res, format)

    res.setHeader('content-type', mime)
  } else {
    res.status(404).json("url miss")
  }
}