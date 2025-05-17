import { Check } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
    <label className='flex items-center cursor-pointer relative'>
      <input
        type='checkbox'
        className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border-2 border-secondary checked:bg-primary checked:border-primary'
        id='check'
        {...props}
      />
      <Check
        size={16}
        className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'
      />
    </label>
  );
};

export default Checkbox;
