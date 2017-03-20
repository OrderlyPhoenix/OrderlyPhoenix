const express = require('express');
const app = express();
const router = express.Router();
const routeCtrl = require('./routeController');

router.get('/level', routeCtrl.getLevel);

module.exports = router;
