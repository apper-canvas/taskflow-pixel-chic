import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CategoryBadge = ({ category, size = "md" }) => {
  if (!category) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      <Badge
        variant="default"
        size={size}
        className="gap-1"
        style={{
          backgroundColor: `${category.color}15`,
          color: category.color,
          borderColor: `${category.color}30`,
        }}
      >
        <ApperIcon name={category.icon} size={12} />
        {category.name}
      </Badge>
    </motion.div>
  );
};

export default CategoryBadge;