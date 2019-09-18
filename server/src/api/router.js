const router = require('express').Router();
// const jobCreate = require('./jenkins/job.create');

const users = require('./resources/users');
const books = require('./resources/books');
const issues = require('./resources/issues');
// const stores = require('./resources/stores');
// const apps = require('./resources/apps');
// const templates = require('./resources/templates');
// const builds = require('./resources/builds');

router.use('/users', users.router);
router.use('/books', books.router);
router.use('/issues', issues.router);

// router.use('/stores', stores.router);
// router.use('/apps', apps.router);
// router.use('/templates', templates.router);
// router.use('/builds', builds.router);

module.exports = router;
