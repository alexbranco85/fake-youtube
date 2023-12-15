const express = require('express');
const app = express();
const router = express.Router();
require("dotenv-safe").config({ path: '.env' });
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth') /* Auth */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv-safe").config();

// app.use('/files', express.static(path.resolve(__dirname,"images")));

const videoController = require('../controllers/VideoController');

// ** Videos
router.post('/video/save', videoController.save);

// ** Panel
// router.post('/panel', auth)

module.exports = router