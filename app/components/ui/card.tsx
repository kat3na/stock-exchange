// app/components/ui/card.tsx
import React from "react";
import { cn } from "@/app/components/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div className={cn("text-white", className)} {...props} />
  );
};
