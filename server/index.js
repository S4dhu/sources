const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const devConfig = require('../webpack.dev.config')
const prodConfig = require('../webpack.prod.config')
const webpack = require('webpack')

const db = require('./db')
const sourceRouter = require('./routes/source-router')

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig

const app = express()
const apiPort = 3000
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(DIST_DIR));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.NODE_ENV === 'development') {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))

    app.get('/', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
        return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
    })
    })
}

if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        res.sendFile(HTML_FILE)
    })
}

app.use('/api', sourceRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))