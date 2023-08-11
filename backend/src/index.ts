import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import bodyparser from 'body-parser'
import cookieparser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import router from './router'

const app = express()

app.use(
  cors({
    credentials: true,
  })
)
app.use(
  compression()
)
app.use(
  cookieparser()
)
app.use(
  bodyparser.json()
)

const server = http.createServer(app)

server.listen(8080, ()=> {
  console.log('server is running on http://localhost:8080/')
})

const MONGO_URL = `mongodb+srv://julinodidimo:gY8dIo8WsIj8DC3j@cluster0.tj7zd7f.mongodb.net/?retryWrites=true&w=majority`

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => {
  console.log(error)
})

app.use('/', router())