var https = require('https')
/* 文件读写包 */
var fs = require('fs')
var path = require('path')
var options = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')
}
//获取本机ip地址
function getIPAdress() {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

function getContentType(url) {
  switch (path.extname(url)) {
    case '.html':
      return 'text/html'
    case '.css':
      return 'text/css'
    case '.mjs':
    case '.js':
      return 'text/javascript'
    case '.json':
      return 'application/json'
    case '.wasm':
      return 'application/wasm'
    case '.mp4':
      return 'video/mp4'
    default:
      return 'application/octate-stream'
  }
}

function sendResponse(url, contentType, res) {
  let file = path.join(__dirname, 'dist', url)
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.write(`File '${file}' Not Found!`)
      res.end()
      console.log('Response: 404 %s, err', file)
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.write(content)
      res.end()
      console.log(`Response: 200 ${file}`)
    }
  })
}

/* 创建服务器，参数是个回调函数，表示如有请求进来，要做什么 */
var server = https.createServer(options, function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credential', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  if (req.url === '/') {
    fs.readFile('./dist/index.html', function(err, data) {
      res.writeHead(200, {
        'Content-type': 'text/html'
      })
      res.end(data)
    })
  } else {
    sendResponse(req.url, getContentType(req.url), res)
  }
})
var ip = getIPAdress()
var port = 8080
server.listen(port, () => {
  var msg = `访问：https://${ip}:${port}`
  console.log(msg)
})
