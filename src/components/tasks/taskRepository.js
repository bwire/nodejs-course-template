class TaskRepository {
  constructor(model) {
    this.model = model;
  }

  async getAllTasks(boardId) {
    return await this.model.find({ boardId });
  }

  async getTaskById(boardId, taskId) {
    return await this.model.findOne({ id: taskId, boardId });
  }

  async createTask(data) {
    return this.model.create(data);
  }

  async updateTask(data) {
    return this.model.update({ id: data.id }, data);
  }

  async deleteTask(id) {
    return await this.model.deleteOne({ id });
  }

  async unassignUserTasks(userId) {
    return await this.model.updateMany({ userId }, { userId: null });
  }

  async deleteBoardTasks(boardId) {
    return await this.model.deleteMany({ boardId });
  }
}

module.exports = new TaskRepository(require('./taskModel'));
