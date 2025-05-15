import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "outline"
    | "text"
    | "link";
  size: "sm" | "md" | "lg" | "icon";
}

function getSize(size: string) {
  switch (size) {
    case "icon":
      return "font-semibold w-10 h-10 rounded-xl active:scale-95";
    case "sm":
      return "font-extrabold text-sm px-3 py-2 rounded-xl active:scale-98";
    case "lg":
      return "font-semibold text-lg px-3 py-2 rounded-xl active:scale-99";
    default: // medium size
      return "font-semibold text-base px-3 py-2 rounded-xl active:scale-99";
  }
}

function getVariant(variant: string) {
  switch (variant) {
    case "secondary":
      return "bg-secondary text-gray-900 shadow-sm shadow-secondary";
    case "danger":
      return "bg-danger text-white shadow-sm shadow-danger";
    case "warning":
      return "bg-warning text-gray shadow-sm shadow-warning";
    case "outline":
      return "bg-transparent border-2 shadow-sm border-secondary hover:bg-secondary";
    case "text":
      return "bg-background hover:bg-secondary shadow-none";
    case "link":
      return "bg-transparent hover:text-underline-offset-1";
    default: // variant primary
      return "bg-primary text-white shadow-primary";
  }
}

const Button = ({
  children,
  variant,
  size,
  className = "",
  ...props
}: ButtonProps) => {
  const variantClasses = getVariant(variant);
  const sizeClasses = getSize(size);
  const baseClasses =
    "flex justify-center items-center gap-2 cursor-pointer filter hover:brightness-90 transition";
  const finalClasses = [baseClasses, variantClasses, sizeClasses, className]
    .filter(Boolean)
    .join(" ")
    .trim();
  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
