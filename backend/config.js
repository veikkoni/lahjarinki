
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.API_PORT || 3000;

module.exports = {
    mongoUrl: mongoUrl,
    port: port
};
