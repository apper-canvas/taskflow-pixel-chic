import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  value = "", 
  onChange, 
  placeholder = "Search tasks...",
  className 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          className={cn(
            "w-5 h-5 transition-colors duration-200",
            isFocused ? "text-primary" : "text-gray-400"
          )}
        />
      </div>
      
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      
      {value && (
        <motion.button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => onChange({ target: { value: "" } })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="X" className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;