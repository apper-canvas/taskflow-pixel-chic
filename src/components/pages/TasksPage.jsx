import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/organisms/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import taskService from "@/services/api/taskService";

const TasksPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskStats, setTaskStats] = useState({ active: 0, completed: 0, total: 0 });
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    categoryId: "all",
    searchQuery: ""
  });

  useEffect(() => {
    loadTaskStats();
  }, []);

  const loadTaskStats = async () => {
    try {
      const tasks = await taskService.getAll();
      const active = tasks.filter(task => !task.completed).length;
      const completed = tasks.filter(task => task.completed).length;
      setTaskStats({
        active,
        completed,
        total: tasks.length
      });
    } catch (error) {
      console.error("Failed to load task stats:", error);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormSuccess = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    loadTaskStats();
  };

  const handleTaskFormCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header onAddTask={handleAddTask} taskStats={taskStats} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-6"
        >
          <SearchBar
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search tasks by title or description..."
          />
          
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
          />
          
          <TaskList
            filters={filters}
            onEditTask={handleEditTask}
            onAddTask={handleAddTask}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleTaskFormCancel();
              }
            }}
          >
            <TaskForm
              task={editingTask}
              onSuccess={handleTaskFormSuccess}
              onCancel={handleTaskFormCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;