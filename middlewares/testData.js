const db = require("../models");
const { Parcours, Niveau } = db;
const asyncHandler = require("express-async-handler");

const handleStart = asyncHandler(async () => {
  const all_parcours = await Parcours.findAll();
  if (!all_parcours.length) {
    Parcours.bulkCreate([
      { designation: "PRO" },
      { designation: "GB" },
      { designation: "SR" },
      { designation: "IG" },
      { designation: "L1Pro" },
    ])
      .then(() => {
        console.log("parcours ajouté avec succès");
      })
      .catch((err) => {
        console.log(err.parent.detail);
      });
  } else {
    console.log("efa misy parcours ao");
  }

  Niveau.findAll().then((levels) => {
    if (!levels.length) {
      Niveau.bulkCreate([
        { designation: "L1" },
        { designation: "L2" },
        { designation: "L3" },
        { designation: "M1" },
        { designation: "M2" },
      ])
        .then(() => {
          console.log("niveau ajouté avec succès");
        })
        .catch((err) => {
          console.log(err.parent.detail);
        });
    } else {
      console.log("efa misy niveau ao");
    }
  });
});

module.exports = {
  handleStart,
};
