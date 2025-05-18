import React, { InputHTMLAttributes } from "react";

interface ElectionOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const ElectionOption = ({ children, ...props }: ElectionOptionProps) => {
  return (
    <div>
      <input
        type='radio'
        id='hosting-small'
        name='hosting'
        value='hosting-small'
        className='hidden peer'
        required
        {...props}
      />
      <label
        htmlFor='hosting-small'
        className='inline-flex text-base font-bold items-center justify-between w-full p-5 text-gray-900 bg-white border-2 border-secondary rounded-2xl cursor-pointer shadow-sm peer-checked:border-primary peer-checked:text-primary peer-checked:shadow-primary/100'
      >
        {children}
      </label>
    </div>
  );
};

export default ElectionOption;
