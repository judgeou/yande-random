import fetch from 'node-fetch'
import HttpsProxyAgent from 'https-proxy-agent'
import sharp from 'sharp'

const { http_proxy } = process.env
const agent = http_proxy ? new HttpsProxyAgent(http_proxy) : null

async function yande_post (tags, limit = 10) {
  let data = await fetch(`https://yande.re/post.json?limit=${limit}&tags=${tags}`, {
    agent
  })

  return data.json()
}

async function yande_image (url) {
  let res = await fetch(url, { agent })

  return res.body
}

/**
 * 
 * @param {NodeJS.ReadableStream} stream 
 * @returns {Promise<Buffer>}
 */
async function stream2buffer (stream) {
  return new Promise((resolve, reject) => {
    let buf = []
    stream.on('data', chunk => buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(buf)))
    stream.on('error', err => reject(err))
  })
}

/**
 * 
 * @param {NodeJS.ReadableStream} image 
 * @param {NodeJS.WritableStream} output_stream
 * @returns 
 */
function compress_image (image, output_stream, format = 'webp') {
  let s = sharp().toFormat(format)

  image.pipe(s)
  s.pipe(output_stream)

  return {
    'webp': 'image/webp',
    'avif': 'image/avif'
  }[format] || 'application/octet-stream'
}

export {
  yande_post,
  yande_image,
  compress_image
}
