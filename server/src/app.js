const express = require('express');

const router = require('./api/router');
const middleware = require('./middleware');
const db = require('./db');
const initialize = require('./initialize');
const notFoundResponse = require('./api/response/notFound.error.response');


// process queue
// require('./api/jobs/jobs.processes');

const app = express();

db();
middleware(app);
initialize();

app.use('/api', router);

app.use((req, res) => {
  notFoundResponse(res);
});

module.exports = app;
