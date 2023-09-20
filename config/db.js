const { Sequelize } = require('sequelize');

database = process.env.DATABASE;
username = process.env.USERNAMEDB;
password = process.env.PASSWORDDB;

module.exports = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
  });

  