module.exports = {
    HOST: "localhost",
    USER: process.env.USERNAMEDB,
    PASSWORD: process.env.PASSWORDDB,
    DB: process.env.DATABASE,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}