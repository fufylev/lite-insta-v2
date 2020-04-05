'use strict'

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log(err))

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!'
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
