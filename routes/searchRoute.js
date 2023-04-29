const router = require('express').Router()

const { searchResultController } = require('../controllers/searchController');
const { passportAuthentication } = require('../middlewares/authentication');

router.get('/term/:searchterm', passportAuthentication, searchResultController);

module.exports= router;