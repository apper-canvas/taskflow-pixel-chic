const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Tasks';

const taskService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        orderBy: [
          { fieldName: "completed", sorttype: "ASC" },
          { fieldName: "priority", sorttype: "ASC" },
          { fieldName: "createdAt", sorttype: "DESC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const params = {
        records: [{
          title: taskData.title,
          description: taskData.description || "",
          categoryId: parseInt(taskData.categoryId),
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          completed: false
        }]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create task");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async update(id, taskData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          title: taskData.title,
          description: taskData.description || "",
          categoryId: parseInt(taskData.categoryId),
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          completed: taskData.completed !== undefined ? taskData.completed : false
        }]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`);
          throw new Error("Failed to update task");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete task");
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) throw new Error("Task not found");
      
      // Update with toggled completion status
      const updatedTask = await this.update(id, {
        ...currentTask,
        completed: !currentTask.completed,
        completedAt: !currentTask.completed ? new Date().toISOString() : null
      });
      
      return updatedTask;
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  },

  async bulkDelete(ids) {
    try {
      const params = {
        RecordIds: ids.map(id => parseInt(id))
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.map(result => result.data);
      }
      
      return [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting tasks:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
};

export default taskService;