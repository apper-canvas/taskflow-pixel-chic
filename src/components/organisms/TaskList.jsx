import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const TaskList = ({ filters, onEditTask, onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.Id === updatedTask.Id ? updatedTask : task
      )
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === parseInt(categoryId));
  };

  const filterTasks = (tasks) => {
    let filtered = tasks;

    // Filter by status
    if (filters.status === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Filter by category
    if (filters.categoryId && filters.categoryId !== "all") {
      filtered = filtered.filter(task => task.categoryId === parseInt(filters.categoryId));
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  if (loading) return <Loading variant="tasks" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const filteredTasks = filterTasks(tasks);

  if (filteredTasks.length === 0) {
    const isFiltered = filters.status !== "all" || 
                      filters.priority !== "all" || 
                      filters.categoryId !== "all" || 
                      filters.searchQuery;

    return (
      <Empty
        icon={isFiltered ? "Search" : "CheckSquare"}
        title={isFiltered ? "No matching tasks" : "No tasks yet"}
        message={
          isFiltered 
            ? "Try adjusting your filters to find what you're looking for."
            : "Get organized and productive by creating your first task!"
        }
        actionText={isFiltered ? "Clear Filters" : "Add Your First Task"}
        onAction={isFiltered ? () => window.location.reload() : onAddTask}
      />
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            category={getCategoryById(task.categoryId)}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onEdit={onEditTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;