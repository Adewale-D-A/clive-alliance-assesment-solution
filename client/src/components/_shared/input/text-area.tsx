import * as React from "react";
import { cn } from "../../../utils/cn";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  applyTheme?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full px-3 py-2 border disabled:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
