const mongoUrl = process.env.MONGODB_URL;
const port = process.env.API_PORT || 80;
const clientAddress = process.env.CLIENT_ADDRESS;

module.exports = {
  mongoUrl: mongoUrl,
  port: port,
  clientAddress: clientAddress,
};
