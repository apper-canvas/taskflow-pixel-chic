import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  children,
  className, 
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 text-sm bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed appearance-none";
  
  const stateClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
    : "border-gray-200 focus:border-primary focus:ring-primary/20 hover:border-gray-300";

  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(baseClasses, stateClasses, className)}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;