class TaskService {
  constructor(repository, mapper) {
    this.repo = repository;
    this.mapper = mapper;
  }

  async getAllTasks(boardId) {
    const tasks = await this.repo.getAllTasks(boardId);
    return tasks.map(task => this.mapper.toResponse(task));
  }

  async getTaskById(boardId, id) {
    const task = await this.repo.getTaskById(boardId, id);
    return this.mapper.toResponse(task);
  }

  async createTask(data) {
    const task = await this.repo.createTask(data);
    return this.mapper.toResponse(task);
  }

  async updateTask(data) {
    const task = await this.repo.updateTask(data);
    return this.mapper.toResponse(task);
  }

  async deleteTask(id) {
    return await this.repo.deleteTask(id);
  }

  async unassignUserTasks(userId) {
    return await this.repo.unassignUserTasks(userId);
  }
}

module.exports = new TaskService(
  require('./taskRepository'),
  require('./taskMapper')
);
