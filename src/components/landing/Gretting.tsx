import SearchBar from "../input/SearchBar";

const Gretting = () => {
  return (
    <div className='max-w-3xl flex flex-col mx-auto text-center items-center py-10'>
      <h1 className='text-4xl font-semibold'>This is title</h1>
      <h4 className='text-base'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste sed
        voluptate aperiam ratione natus illum autem facilis!
      </h4>
      <div className='pt-4 w-full'>
        <SearchBar className='' />
      </div>
    </div>
  );
};

export default Gretting;
