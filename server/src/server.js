require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 300;
const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
