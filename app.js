const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;
const corOptions = {
  origin:`http://localhost:${port}`
}

app.use(cors(corOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false } ))
app.use((req, res, next) => {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(express.static('./public'));

const db = require('./models')

db.sequelize.sync({force: false}).then(()=>{
    console.log("DB sync");
});


//routes
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/student', require('./routes/student.routes'))
app.use('/api/prof', require('./routes/prof.routes'))
app.use('/api/parcours', require('./routes/parcours.routes'))
app.use('/api/salle', require('./routes/salle.routes'))
app.use('/api/seance', require('./routes/seance.routes'))
app.use('/api/niveau', require('./routes/level.routes'))
app.use('/api/matiere', require('./routes/matiere.routes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})