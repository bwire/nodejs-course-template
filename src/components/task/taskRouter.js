const router = require('express').Router({ mergeParams: true });
const service = require('./taskService');

router.route('/').get(async (req, res) => {
  const tasks = await service.getAllTasks(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await service.getTaskById(req.params.boardId, req.params.id);
  if (task !== undefined) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
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
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
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
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const idDeleted = await service.deleteTask(req.params.id);
  if (idDeleted) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
