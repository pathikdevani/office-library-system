const express = require('express');

const cors = require('cors');
const router = require('./api/router');
const middleware = require('./middleware');
const db = require('./db');
const initialize = require('./initialize');
const notFoundResponse = require('./api/response/notFound.error.response');


// process queue
// require('./api/jobs/jobs.processes');

const app = express();

const whitelist = ['http://localhost:2020'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

db();
middleware(app);
initialize();

app.use('/api', router);

app.use((req, res) => {
  notFoundResponse(res);
});

module.exports = app;
