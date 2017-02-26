const express = require('express');
const urlController = require('../controllers/urlController.js');
const app = express();
const router = express.Router();

router.get('/new/:url*', urlController.create_url_get);

router.get('/:url*', urlController.get_url);

module.exports = router;
