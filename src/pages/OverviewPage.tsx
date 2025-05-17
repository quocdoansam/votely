import ElectionList from "../components/election/ElectionList";
import Gretting from "../components/landing/Gretting";

const OverviewPage = () => {
  return (
    <div className='flex flex-col mx-auto'>
      <Gretting />
      <ElectionList status='ongoing' />
    </div>
  );
};

export default OverviewPage;
