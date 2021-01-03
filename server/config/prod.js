module.exports = {
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL,
    PORT: process.env.PORT || 3100,
    MAIN_URL: process.env.MAIN_URL,
    DB: "mongodb://localhost:27017/pokedex",
    SECRET: "mySecretToken",
};