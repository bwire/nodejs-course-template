const router = require('express').Router();
const boardService = require('./boardService');
const taskService = require('../tasks/taskService');
const { handleRoute, DataError, RequestError } = require('../../common/errors');

router.route('/').get(
  handleRoute(async (req, res) => {
    const boards = await boardService.getAllBoards();
    res.json(boards);
  })
);

router.route('/:id').get(
  handleRoute(async (req, res) => {
    const board = await boardService.getBoardById(req.params.id);
    if (board) {
      res.json(board);
    } else {
      throw new DataError('Board not found');
    }
  })
);

router.route('/').post(
  handleRoute(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardService.createBoard({ title, columns });
    if (board) {
      res.statusMessage = 'The board has been created';
      res.json(board);
    } else {
      throw new RequestError('Bad request');
    }
  })
);

router.route('/:id').put(
  handleRoute(async (req, res) => {
    const board = await boardService.updateBoard({
      id: req.params.id,
      title: req.body.title,
      columns: req.body.columns
    });
    if (board) {
      res.json(board);
    } else {
      throw new RequestError('Bad request');
    }
  })
);

router.route('/:id').delete(
  handleRoute(async (req, res) => {
    const { id } = req.params;
    const boardDeleted = await boardService.deleteBoard(id);
    if (!boardDeleted) {
      throw new DataError('Board not found');
    }
    await taskService.deleteBoardTasks(id);
    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
