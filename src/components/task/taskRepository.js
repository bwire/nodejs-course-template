class TaskRepository {
  constructor(model) {
    this.tasks = [];
    this.model = model;
  }

  createNewTaskFromModel(data) {
    return new this.model(data);
  }

  async getAllTasks(boardId) {
    return this.tasks.filter(t => t.boardId === boardId);
  }

  async getTaskById(boardId, taskId) {
    return this.tasks.find(t => t.boardId === boardId && t.id === taskId);
  }

  async createTask(data) {
    const task = this.createNewTaskFromModel(data);
    this.tasks.push(task);
    return task;
  }

  async updateTask(data) {
    const idx = this.tasks.findIndex(task => task.id === data.id);
    if (idx !== -1) {
      this.tasks[idx] = data;
      return this.tasks[idx];
    }
    return undefined;
  }

  async deleteTask(id) {
    const idx = this.tasks.findIndex(task => task.id === id);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      return id;
    }
    return undefined;
  }

  async unassignUserTasks(userId) {
    this.tasks.map(task => {
      if (task.userId === userId) {
        task.userId = null;
      }
    });
    return userId;
  }
}

module.exports = new TaskRepository(require('./taskModel'));
