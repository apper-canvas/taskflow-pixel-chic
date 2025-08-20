import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, size = "md" }) => {
  const priorityConfig = {
    high: {
      variant: "high",
      icon: "AlertTriangle",
      text: "High Priority"
    },
    medium: {
      variant: "medium", 
      icon: "Minus",
      text: "Medium Priority"
    },
    low: {
      variant: "low",
      icon: "ArrowDown",
      text: "Low Priority"
    }
  };

  const config = priorityConfig[priority];
  if (!config) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      <Badge variant={config.variant} size={size} className="gap-1">
        <ApperIcon name={config.icon} size={12} />
        {config.text}
      </Badge>
    </motion.div>
  );
};

export default PriorityBadge;