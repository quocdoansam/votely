import Logo from "../components/landing/Logo";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto h-screen p-4 gap-6'>
      <div className='flex flex-col gap-2 items-center'>
        <p className='flex flex-row gap-2 text-2xl md:text-3xl font-bold pb-6'>
          Wellcome to
          <a href='/'>
            <Logo />
          </a>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
