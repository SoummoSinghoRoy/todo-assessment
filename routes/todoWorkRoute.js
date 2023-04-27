const router = require('express').Router()

const { todoWorksController,
        todoWorkCreateController,
        todoWorkEditController,
        todoWorkDeleteController
      } = require('../controllers/todoWorkController');
const { passportAuthentication } = require('../middlewares/authentication');

router.get('/', passportAuthentication, todoWorksController);
router.post('/add', passportAuthentication, todoWorkCreateController);
router.put('/edit/:todoId', passportAuthentication, todoWorkEditController);
router.delete('/delete/:todoId', passportAuthentication, todoWorkDeleteController);

module.exports = router;