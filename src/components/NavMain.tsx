import { ChevronDown } from "lucide-react";

const NavMain = () => {
  return (
    <ul className='flex flex-row justify-center gap-6'>
      <li className='cursor-pointer text-base font-semibold flex items-center'>
        Overview
      </li>

      <div className='flex flex-row gap-2 items-center'>
        <li className='cursor-pointer text-base font-semibold'>
          Create election
        </li>
        <ChevronDown />
      </div>

      <li className='cursor-pointer text-base font-semibold flex items-center'>
        About US
      </li>
    </ul>
  );
};

export default NavMain;
