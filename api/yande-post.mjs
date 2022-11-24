import { yande_post } from '../lib/index.mjs'

export const config = {
  runtime: 'experimental-edge',
};

export default async (req) => {
  let posts = await yande_post()
  return new Response(posts)
}
