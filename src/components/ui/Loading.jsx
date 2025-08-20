import { motion } from "framer-motion";

const Loading = ({ variant = "tasks" }) => {
  const renderTaskSkeleton = () => (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-premium animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex items-center space-x-4">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </motion.div>
  );

  const renderFormSkeleton = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      {variant === "tasks" && renderTaskSkeleton()}
      {variant === "form" && renderFormSkeleton()}
      {variant === "categories" && (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Loading;