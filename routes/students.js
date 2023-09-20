const express = require('express');
const router = express.Router();
const db = require('../config/db');
const Student = require('../models/Student');
const Sequelize = require('sequelize');

router.get('/', (req, res) => 
  Student.findAll()
    .then(students => res.json(students).status(200))
    .catch(err => console.log(err)));

module.exports = router;