const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { handleStart } = require('./middlewares/testData')

const app = express();
const port = process.env.PORT || 5000;
const corOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(express.static("./public"));
const db = require('./models')

db.sequelize.sync({force: false, alter:true}).then(()=>{
  handleStart();
});

//routes
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/etudiant", require("./routes/etudiant.routes"));
app.use("/api/prof", require("./routes/prof.routes"));
app.use("/api/salle", require("./routes/salle.routes"));
app.use("/api/tranchehoraire", require("./routes/tranchehoraire.routes"));
app.use("/api/niveau", require("./routes/niveau.routes"));
app.use("/api/ec", require("./routes/ec.routes"));
app.use("/api/groupe", require("./routes/groupe.routes"));
app.use("/api/personne_groupe", require("./routes/personne_groupe.routes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
