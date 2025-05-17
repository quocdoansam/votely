import React from "react";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
}

function getDirection(direction?: string) {
  switch (direction) {
    case "horizontal":
      return "flex-row items-center gap-2";
    default: // Default return vertical
      return "flex-col";
  }
}

const InputGroup = ({ children, direction, ...props }: InputGroupProps) => {
  const directionClasses = getDirection(direction);
  const baseClasses = "flex gap-1";
  const finalclasses = [baseClasses, directionClasses]
    .filter(Boolean)
    .join(" ")
    .trim();
  return (
    <div className={finalclasses} {...props}>
      {children}
    </div>
  );
};

export default InputGroup;
