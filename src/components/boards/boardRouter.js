const router = require('express').Router();
const boardService = require('./boardService');
const taskService = require('../tasks/taskService');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAllBoards();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);
  if (board !== undefined) {
    res.json(board);
  } else {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.createBoard({ title, columns });
  if (board !== undefined) {
    res.statusMessage = 'The board has been created';
    res.json(board);
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard({
    id: req.params.id,
    title: req.body.title,
    columns: req.body.columns
  });
  if (board !== undefined) {
    res.json(board);
  } else {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const ids = await Promise.all([
    boardService.deleteBoard(id),
    taskService.deleteBoardTasks(id)
  ]);
  if (ids) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
