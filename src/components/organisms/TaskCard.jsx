import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import taskService from "@/services/api/taskService";

const TaskCard = ({ 
  task, 
  category, 
  onTaskUpdate, 
  onTaskDelete,
  onEdit
}) => {
  const handleToggleComplete = async () => {
    try {
      const updatedTask = await taskService.toggleComplete(task.Id);
      onTaskUpdate(updatedTask);
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.delete(task.Id);
      onTaskDelete(task.Id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-gray-500";
    
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) return "text-red-500";
    if (isToday(date)) return "text-orange-500";
    return "text-gray-500";
  };

  const getPriorityBorder = (priority) => {
    switch (priority) {
      case "high": return "border-l-red-400";
      case "medium": return "border-l-yellow-400";
      case "low": return "border-l-green-400";
      default: return "border-l-gray-200";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed ? 0.7 : 1, 
        y: 0,
        scale: 1
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`
        bg-white rounded-xl p-6 border-l-4 transition-all duration-300
        ${getPriorityBorder(task.priority)}
        ${task.completed ? "opacity-70" : "shadow-premium hover:shadow-hover"}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              className={`font-display font-semibold text-gray-900 mb-2 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              animate={{ 
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#6b7280" : "#111827"
              }}
              transition={{ duration: 0.2 }}
            >
              {task.title}
            </motion.h3>
            
            {task.description && (
              <p className={`text-sm mb-4 ${
                task.completed ? "text-gray-400" : "text-gray-600"
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center flex-wrap gap-3">
              {category && <CategoryBadge category={category} size="sm" />}
              <PriorityBadge priority={task.priority} size="sm" />
              
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-sm ${getDueDateColor(task.dueDate)}`}>
                  <ApperIcon name="Calendar" size={14} />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="p-2 hover:bg-gray-100"
            >
              <ApperIcon name="Edit2" size={16} className="text-gray-500" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 hover:text-red-600"
            >
              <ApperIcon name="Trash2" size={16} className="text-gray-500 hover:text-red-600" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;