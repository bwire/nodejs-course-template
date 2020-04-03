const router = require('express').Router();
const Board = require('./boardModel');
const service = require('./boardService');

router.route('/').get(async (req, res) => {
  const boards = await service.getAllBoards();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await service.createBoard({ title, columns });
  if (board !== undefined) {
    res.statusMessage = 'The board has been created';
    res.json(Board.toResponse(board));
  } else {
    res.statusCode = 400;
    res.send({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req, res) => {
  const board = await service.getBoardById(req.params.id);
  if (board !== undefined) {
    res.json(Board.toResponse(board));
  } else {
    res.statusCode = 404;
    res.send({ error: 'Board not found' });
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await service.updateBoard({
    id: req.params.id,
    title: req.body.title,
    columns: req.body.columns
  });
  if (board !== undefined) {
    res.json(Board.toResponse(board));
  } else {
    res.statusCode = 400;
    res.send({ error: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  res.statusCode = await service.deleteBoard(req.params.id);
  if (res.statusCode === 204) {
    res.json({ status: 'The board has been deleted' });
  } else {
    res.send({ error: 'Board not found' });
  }
});

module.exports = router;
