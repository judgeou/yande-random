import { yande_post, yande_image, compress_image } from '../lib/index.mjs'

export default async function handler (req, res) {
  let { tags } = req.query
  tags = tags || 'score:>70 rating:safe order:random'
  
  let posts = await yande_post(tags, 1)
  
  if (posts && posts.length >= 1) {
    let post = posts[0]
    let { sample_url } = post

    let image = await yande_image(sample_url)
    let mime = compress_image(image, res, 'webp')

    res.setHeader('content-type', mime)
  } else {
    res.status(404).json('no image')
  }
}
