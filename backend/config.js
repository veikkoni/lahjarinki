const port = process.env.API_PORT || 3000;
const clientAddress = process.env.CLIENT_ADDRESS;
const addResultPassword = process.env.ADD_RESULT_PASSWORD;

module.exports = {
  port: port,
  clientAddress: clientAddress,
  addResultPassword: addResultPassword,
};
