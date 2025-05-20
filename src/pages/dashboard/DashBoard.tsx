import { ChevronDown } from "lucide-react";
import ElectionList from "../../components/election/ElectionList";

const Dashboard = () => {
  return (
    <div className='flex-1 mt-4'>
      <h1 className='text-2xl font-semibold'>Dashboard</h1>
      <div className='flex flex-row justify-between py-4 items-center'>
        <span className='font-semibold'>Surveys</span>
        <div className='relative'>
          <select className='w-full bg-white font-semibold text-sm border-2 border-secondary rounded-xl pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary appearance-none cursor-pointer'>
            <option value='popular'>Popular</option>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
          <ChevronDown className='h-5 w-5 ml-1 absolute top-2.5 right-2.5' />
        </div>
      </div>
      <ElectionList status='ongoing' />
    </div>
  );
};

export default Dashboard;
