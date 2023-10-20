const bcrypt = require("bcryptjs");
const db = require("../models");

const { UserAccount } = db;

exports.signin = async (req, res) => {
  let { login, password } = req.body;

  await UserAccount.findOne({
    where: {
      login,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      } else {
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ message: "Invalid Password" });
        } else {
          res.status(200).json({ message: "OK", data: user });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
