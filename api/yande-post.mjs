import { yande_post } from '../lib/index.mjs'

export default async function handler (req, res) {
  let { tags, limit } = req.query
  let posts = await yande_post(tags, limit)
  res.status(200).json(posts)
}
