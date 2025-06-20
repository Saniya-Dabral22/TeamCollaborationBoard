const Board = require('../model/board');
const Task = require('../model/task');

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find().sort({ created_at: -1 });
    res.status(200).json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Board name is required' });
    }

    const newBoard = new Board({ name });
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    console.error('Error creating board:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ board: boardId }).sort({ created_at: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for board:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


exports.createTaskInBoard = async (req, res) => {
  const { boardId } = req.params;
  const taskData = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const task = new Task({ ...taskData, board_id: boardId }); 
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};


  