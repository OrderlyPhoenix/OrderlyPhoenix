const express = require('express');
const app = express();
const router = express.Router();
const routeCtrl = require('./routeController');

router.get('/chapter', routeCtrl.getChapter);

module.exports = router;
