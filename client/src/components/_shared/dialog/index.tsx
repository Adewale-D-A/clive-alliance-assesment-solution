/** @format */
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../../utils/cn";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const modalContentsVariants = cva(
  "fixed  top-[50%] z-50 w-full max-w-lg   translate-y-[-50%] gap-4 border bg-white px-2 lg:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      variant: {
        default: "left-[50%] translate-x-[-50%]",
        alignRight: "right-0 h-full translate-x-[0%]",
        slideToRight: "left-[50%] translate-x-[-50%]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentsVariants> {}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, variant, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <motion.div
      initial={{
        x:
          variant === "alignRight"
            ? "100vw"
            : variant === "slideToRight"
            ? "-100vw"
            : "0px",
        height: variant === "default" ? "0%" : "fit-content",
      }} // start off-screen
      animate={{ x: 0, height: "fit-content" }} // animate into position
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 2000,
      }}
      className={cn(
        "md:min-h-fit min-h-lvw",
        modalContentsVariants({
          variant:
            variant === "default" || variant === "alignRight"
              ? variant
              : "default",
          className,
        })
      )}
    >
      <DialogPrimitive.Content
        ref={ref}
        {...props}
        className={cn(
          "overflow-y-auto h-full p-4",
          variant === "default" && "max-h-[calc(100vh-100px)]",
          variant === "alignRight" && "max-h-[calc(100vh-10px)]",
          variant === "slideToRight" && " max-h-[calc(100vh-100px)]"
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </motion.div>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight mb-8",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
