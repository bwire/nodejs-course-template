const router = require('express').Router({ mergeParams: true });
const service = require('./taskService');
const { handleRoute, DataError, RequestError } = require('../../common/errors');

router.route('/').get(
  handleRoute(async (req, res) => {
    const tasks = await service.getAllTasks(req.params.boardId);
    res.json(tasks);
  })
);

router.route('/:id').get(
  handleRoute(async (req, res) => {
    const task = await service.getTaskById(req.params.boardId, req.params.id);
    if (task) {
      res.json(task);
    } else {
      throw new DataError('Task not found');
    }
  })
);

router.route('/').post(
  handleRoute(async (req, res) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await service.createTask({
      boardId,
      title,
      order,
      description,
      userId,
      columnId
    });
    if (task !== undefined) {
      res.statusMessage = 'The task has been created';
      res.json(task);
    } else {
      throw new RequestError('Bad request');
    }
  })
);

router.route('/:id').put(
  handleRoute(async (req, res) => {
    const { id, boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await service.updateTask({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    if (task !== undefined) {
      res.statusMessage = 'The task has been updated';
      res.json(task);
    } else {
      throw new RequestError('Bad request');
    }
  })
);

router.route('/:id').delete(
  handleRoute(async (req, res) => {
    const deleted = await service.deleteTask(req.params.id);
    if (deleted) {
      res.status(204).send('The task has been deleted');
    } else {
      throw new DataError('Task not found');
    }
  })
);

module.exports = router;
