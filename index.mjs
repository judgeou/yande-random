import fetch from 'node-fetch'
import HttpsProxyAgent from 'https-proxy-agent'

const { http_proxy } = process.env
const agent = http_proxy ? new HttpsProxyAgent(http_proxy) : null

let data = await fetch('https://yande.re/post.json', {
  agent
})

console.log(data)
