import { ChevronDown } from "lucide-react";
import Button from "../button/Button";

const FilterElection = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between py-4 gap-3'>
      <div className='w-full max-w-sm min-w-[200px]'>
        <div className='relative'>
          <select className='w-full bg-white font-semibold text-sm border-2 border-secondary rounded-xl pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary appearance-none cursor-pointer'>
            <option value='popular'>Popular</option>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
          <ChevronDown className='h-5 w-5 ml-1 absolute top-2.5 right-2.5' />
        </div>
      </div>
      <div className='flex flex-row gap-3 overflow-auto'>
        <Button variant='text' size='md'>
          All
        </Button>
        <Button variant='text' size='md' className='whitespace-nowrap'>
          Not Started
        </Button>
        <Button variant='text' size='md'>
          Ongoing
        </Button>
        <Button variant='text' size='md'>
          Ended
        </Button>
      </div>
    </div>
  );
};

export default FilterElection;
