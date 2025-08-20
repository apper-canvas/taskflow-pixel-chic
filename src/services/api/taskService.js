import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks].sort((a, b) => {
      // Sort by completed status first (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Finally by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  async getById(id) {
    await delay(200);
    return tasks.find(task => task.Id === parseInt(id));
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
  },

  async update(id, taskData) {
    await delay(250);
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString()
      };
      return tasks[taskIndex];
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
    if (taskIndex !== -1) {
      const deletedTask = tasks[taskIndex];
      tasks.splice(taskIndex, 1);
      return deletedTask;
    }
    return null;
  },

  async toggleComplete(id) {
    await delay(250);
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      task.updatedAt = new Date().toISOString();
      return task;
    }
    return null;
  },

  async bulkDelete(ids) {
    await delay(350);
    const deletedTasks = tasks.filter(task => ids.includes(task.Id));
    tasks = tasks.filter(task => !ids.includes(task.Id));
    return deletedTasks;
  }
};

export default taskService;