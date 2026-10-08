import http from 'http'
import fs from 'fs'
import path from 'path'

const server = http.createServer((req, res) => {
  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173'
    })

    const filePath = path.join(
      process.cwd(),
      'public',
      'products.json'
    )

    try {
  const products = fs.readFileSync(filePath, 'utf8')

  res.end(products)
} catch (error) {
  res.writeHead(500, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify({
    error: 'Failed to load products'
  }))
}

    return
  }
if (req.url === '/health' && req.method === 'GET') {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })

  res.end('Server is healthy')

  return
}
  res.writeHead(404)
  res.end('Not found')
})

server.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})