import { useContext } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "../../App";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <Button
      onClick={logout}
      variant="secondary"
      size="lg"
      className="gap-2 shadow-premium hover:shadow-hover"
    >
      <ApperIcon name="LogOut" size={18} />
      Logout
    </Button>
  );
};
const Header = ({ onAddTask, taskStats }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 shadow-premium mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-purple-gradient rounded-2xl flex items-center justify-center shadow-premium">
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                TaskFlow
              </h1>
              <p className="text-gray-600">
                Organize your day with clarity and focus
              </p>
            </div>
          </motion.div>
        </div>
        
<div className="flex items-center gap-6">
          {taskStats && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:flex items-center gap-6 text-sm"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {taskStats.active}
                </div>
                <div className="text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {taskStats.completed}
                </div>
                <div className="text-gray-600">Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">
                  {taskStats.total}
                </div>
                <div className="text-gray-600">Total</div>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Button
                onClick={onAddTask}
                size="lg"
                className="gap-3 shadow-premium hover:shadow-hover"
              >
                <ApperIcon name="Plus" size={20} />
                Add Task
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <LogoutButton />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;