// Import contact controller
const todoController = require('../controllers/todoController');

// Initialize express router
const router = require('express').Router();

// Contact routes
router.route('/')
    .get(todoController.list)
    .post(todoController.new);

router.route('/:todo_id')
    .put(todoController.update)
    .delete(todoController.delete);

// Export API routes
module.exports = router;