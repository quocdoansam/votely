import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

const Error404 = () => {
  const navigator = useNavigate();
  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center flex-col flex-1'>
      <h1 className='text-6xl font-bold'>404</h1>
      <Button variant='text' size='md' onClick={() => navigator("/")}>
        Back to home page
      </Button>
    </div>
  );
};

export default Error404;
