import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error = false,
  rows = 3,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 text-sm bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 resize-none";
  
  const stateClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
    : "border-gray-200 focus:border-primary focus:ring-primary/20 hover:border-gray-300";

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseClasses, stateClasses, className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;