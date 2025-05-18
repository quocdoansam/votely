const ElectionDetailSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 animate-pulse'>
      <div className='w-[80%] h-6 rounded-xl bg-secondary' />
      <div className='w-full h-12 rounded-xl bg-secondary' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='w-full h-24 rounded-xl bg-secondary' />
        <div className='w-full h-24 rounded-xl bg-secondary' />
        <div className='w-full h-24 rounded-xl bg-secondary' />
        <div className='w-full h-24 rounded-xl bg-secondary' />
      </div>
    </div>
  );
};

export default ElectionDetailSkeleton;
