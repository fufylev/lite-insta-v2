const express = require('express')
const cors = require('cors')
const config = require('config')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

/* if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} */

const PORT = config.get('port') || 5000

async function start () {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`🚀 App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
