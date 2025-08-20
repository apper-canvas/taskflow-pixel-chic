import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "CheckSquare", 
  title = "No tasks yet", 
  message = "Get started by creating your first task", 
  actionText = "Add Task",
  onAction 
}) => {
  return (
    <motion.div
      className="text-center py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-8"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </motion.div>
      
      <motion.h3
        className="text-2xl font-display font-bold text-gray-900 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-8 max-w-md mx-auto text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>
      
      {onAction && actionText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={onAction} size="lg" className="gap-3">
            <ApperIcon name="Plus" size={18} />
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;