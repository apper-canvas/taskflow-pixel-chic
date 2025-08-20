import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      className="text-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </motion.div>
      
      <motion.h3
        className="text-xl font-display font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! Something went wrong
      </motion.h3>
      
      <motion.p
        className="text-gray-600 mb-8 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {message || "We encountered an unexpected error. Please try again."}
      </motion.p>
      
      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={onRetry} className="gap-2">
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;