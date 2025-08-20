import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const TaskForm = ({ task = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
    
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId?.toString() || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : ""
      });
    }
  }, [task]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const taskData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };

      if (task) {
        await taskService.update(task.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await taskService.create(taskData);
        toast.success("Task created successfully!");
      }

      onSuccess();
    } catch (error) {
      toast.error(task ? "Failed to update task" : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-8 shadow-premium max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-gradient rounded-xl flex items-center justify-center">
            <ApperIcon name={task ? "Edit" : "Plus"} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
        </div>
        
        <Button variant="ghost" size="sm" onClick={onCancel} className="p-2">
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Title" error={errors.title} required>
          <Input
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Enter task title..."
            error={!!errors.title}
          />
        </FormField>

        <FormField label="Description" error={errors.description}>
          <Textarea
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Add a description (optional)..."
            rows={4}
            error={!!errors.description}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Category" error={errors.categoryId} required>
            <Select
              value={formData.categoryId}
              onChange={handleChange("categoryId")}
              error={!!errors.categoryId}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Priority" error={errors.priority}>
            <Select
              value={formData.priority}
              onChange={handleChange("priority")}
              error={!!errors.priority}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Due Date" error={errors.dueDate}>
          <Input
            type="datetime-local"
            value={formData.dueDate}
            onChange={handleChange("dueDate")}
            error={!!errors.dueDate}
          />
        </FormField>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="gap-2"
          >
            <ApperIcon name={task ? "Save" : "Plus"} size={16} />
            {loading ? "Saving..." : (task ? "Update Task" : "Create Task")}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;