import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ filters, onFilterChange }) => {
  const statusOptions = [
    { value: "all", label: "All Tasks", icon: "List" },
    { value: "active", label: "Active", icon: "Clock" },
    { value: "completed", label: "Completed", icon: "CheckSquare" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities", icon: "BarChart3" },
    { value: "high", label: "High", icon: "AlertTriangle" },
    { value: "medium", label: "Medium", icon: "Minus" },
    { value: "low", label: "Low", icon: "ArrowDown" }
  ];

  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handlePriorityChange = (priority) => {
    onFilterChange({ ...filters, priority });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-premium mb-8"
    >
      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={filters.status === option.value ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusChange(option.value)}
                  className="gap-2"
                >
                  <ApperIcon name={option.icon} size={14} />
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Priority</h3>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map(option => (
              <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={filters.priority === option.value ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handlePriorityChange(option.value)}
                  className="gap-2"
                >
                  <ApperIcon name={option.icon} size={14} />
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(filters.status !== "all" || filters.priority !== "all" || filters.searchQuery) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-4 border-t border-gray-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Filters active • {filters.status !== "all" ? "Status" : ""} 
                {filters.priority !== "all" ? " Priority" : ""} 
                {filters.searchQuery ? " Search" : ""}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange({
                  status: "all",
                  priority: "all",
                  categoryId: "all",
                  searchQuery: ""
                })}
                className="gap-1 text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="X" size={14} />
                Clear All
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterBar;