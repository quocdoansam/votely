import { LoginForm } from "../components/form/LoginForm";
import Logo from "../components/landing/Logo";

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col max-w-md mx-auto px-4'>
      <div className='flex flex-col my-12 items-center gap-4'>
        <a href='/'>
          <Logo size={120} />
        </a>
        <h1 className='text-center text-4xl'>
          Welcome to <span className='font-bold'>BlockSurvey</span>
        </h1>
      </div>

      <div className='flex flex-1 grow justify-center'>
        <LoginForm />
      </div>
      <div className='text-balance text-center text-xs text-muted-foreground py-6'>
        By clicking continue, you agree to our
        <a
          href='terms'
          className='underline underline-offset-4 hover:text-primary mx-1'
        >
          Terms of Service
        </a>
        and
        <a
          href='privacy'
          className='underline underline-offset-4 hover:text-primary mx-1'
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Login;
