
// import HttpsProxyAgent from 'https-proxy-agent'

// const { http_proxy } = process.env
// const agent = http_proxy ? new HttpsProxyAgent(http_proxy) : null

async function yande_post () {
  let data = await fetch('https://yande.re/post.json', {

  })

  return data.json()
}

export {
  yande_post
}
