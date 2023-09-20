const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const db = require('./config/db')
// const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false } ))

//routes
app.get('/',(req, res) => res.send('index'))
app.use('/api/students', require('./routes/students'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})