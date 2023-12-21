const express = require('express');
const app = express();
const router = express.Router();
require("dotenv-safe").config({ path: '.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv-safe").config();

const videoController = require('../controllers/VideoController');

// ** Videos
router.post('/video/save', videoController.save);
router.get('/video/show-all', videoController.showAll);
router.get('/video/single/:idYt', videoController.showSingle);

module.exports = router