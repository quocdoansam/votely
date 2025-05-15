import Logo from "../components/landing/Logo";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto h-screen p-4 gap-6'>
      <div className='flex flex-col gap-2 items-center'>
        <a href='/'>
          <Logo size={128} />
        </a>
        <h1 className='text-2xl md:text-3xl font-bold'>Wellcome to Votely</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
