const express = require('express');
const router = express.Router();

const {
  getBoards,
  createBoard,
  getTasksByBoard,
  createTaskInBoard
} = require('../controller/boardController');

const {
  updateTask,
  deleteTask
} = require('../controller/taskController'); // import update/delete functions

router.get('/', getBoards);
router.post('/', createBoard);

router.get('/:boardId/tasks', getTasksByBoard);
router.post('/:boardId/tasks', createTaskInBoard);

router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;
