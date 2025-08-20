import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <motion.label
      className={cn(
        "relative inline-flex items-center justify-center w-5 h-5 cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      
      <motion.div
        className={cn(
          "w-5 h-5 border-2 rounded transition-all duration-200",
          checked
            ? "bg-primary border-primary"
            : "bg-white border-gray-300 hover:border-gray-400"
        )}
        initial={false}
        animate={{
          backgroundColor: checked ? "#5B4FE5" : "#ffffff",
          borderColor: checked ? "#5B4FE5" : "#d1d5db",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: checked ? 1 : 0, 
            scale: checked ? 1 : 0 
          }}
          transition={{ duration: 0.15, type: "spring", stiffness: 300 }}
          className="flex items-center justify-center w-full h-full"
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
    </motion.label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;