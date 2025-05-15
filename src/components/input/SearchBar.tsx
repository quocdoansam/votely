import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className='flex flex-row flex-1 items-center border-2 border-secondary rounded-xl text-base font-semibold min-w-72 max-w-xl'>
      <input
        type='text'
        placeholder='Type the election ID'
        className='outline-none px-4 py-2 border-r-2 border-secondary w-full'
      />
      <div className='w-10 h-10 flex items-center justify-center'>
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
