var express = require('express')
var config = require('./config/index')
var data = require('./static/data.json')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()
var apiRouter = express.Router()
app.use(router);
app.use('static', apiRouter)

app.use(express.static('./dist'))

router.get('/', function (req, res, next){
    req.url = '/index.html'
    next()
})

apiRouter.get('/data.json', function (req, res){
    res.json({
        data: data
    })
})


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }else {
      console.log("服务启动成功")
  }
})

