import { yande_post } from '../lib/index.mjs'

export default async function handler (req, res) {
  let { tags } = req.query
  let posts = await yande_post(tags)
  res.status(200).json(posts)
}
