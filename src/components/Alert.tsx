import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "danger" | "warning" | "success";
}

function getVariant(variant?: string) {
  switch (variant) {
    case "danger":
      return "bg-danger/20 text-danger";
    case "warning":
      return "bg-warning/20 text-warning";
    case "success":
      return "bg-success/20 text-success";
    default:
      return "bg-secondary/20 text-gray-900";
  }
}

function getIcon(variant?: string) {
  switch (variant) {
    case "danger":
      return CircleAlert;
    case "warning":
      return TriangleAlert;
    case "success":
      return CircleCheck;
    default:
      return Info;
  }
}

const Alert = ({ children, variant, ...props }: AlertProps) => {
  const variantClasses = getVariant(variant);
  const baseClasses = "flex flex-row p-4 rounded-xl";
  const finalClasses = [baseClasses, variantClasses]
    .filter(Boolean)
    .join(" ")
    .trim();
  return (
    <div className={finalClasses} {...props}>
      {React.createElement(getIcon(variant), { className: "mr-2" })}
      <div>{children}</div>
    </div>
  );
};

export default Alert;
