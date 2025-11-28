import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  applyTheme?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    const [showPwd, setShowPwd] = React.useState(false);
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {leftIcon}
          </div>
        )}
        {type === "password" ? (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-4"
            onClick={() =>
              type === "password" ? setShowPwd(!showPwd) : undefined
            }
          >
            {showPwd ? <EyeOff color="#858C95" /> : <Eye color="#858C95" />}
          </div>
        ) : rightIcon ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightIcon}
          </div>
        ) : null}
        <input
          type={showPwd ? "text" : type}
          className={cn(
            "w-full px-3 py-2 border disabled:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent",
            className,
            leftIcon && "pl-12",
            rightIcon && "pr-12"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
