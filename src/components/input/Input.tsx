import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = "", ...props }: InputProps) => {
  const baseClasses =
    "bg-white text-base font-semibold p-2 border-2 border-solid border-secondary rounded-xl outline-none focus:border-primary transition";
  const finalClasses = [baseClasses, className]
    .filter(Boolean)
    .join(" ")
    .trim();
  return <input className={finalClasses} {...props} />;
};

export default Input;
