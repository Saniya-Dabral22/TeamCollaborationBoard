const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
