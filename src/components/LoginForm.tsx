import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { magic } from "../lib/magic";
import Button from "./button/Button";
import Input from "./input/Input";
import { Goal, Loader, User2 } from "lucide-react";
import Divider from "./Divider";

export function LoginForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [isEmailLoading, setEmailLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const { fetchUser } = useAuth();
  const navigator = useNavigate();

  const handleLogin = async () => {
    if (!email) return;
    try {
      setEmailLoading(true);

      await magic.auth.loginWithMagicLink({ email });

      await fetchUser();
      navigator("/");
    } catch (error) {
      console.error("Error login with email: ", error);
    } finally {
      setEmailLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      await magic.oauth2.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/callback`,
        scope: ["profile", "email", "openid"],
      });
    } catch (error) {
      console.error("Error login with Google:", error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-between gap-4'>
      <form
        className='flex flex-col gap-3'
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Input
          placeholder='Enter your email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant='primary' size='md'>
          {isEmailLoading ? <Loader className='animate-spin' /> : "Login"}
        </Button>
      </form>
      <Divider />
      <div className='grid grid-rows-1 md:grid-cols-2 gap-2'>
        <Button variant='secondary' size='md' onClick={loginWithGoogle}>
          {isGoogleLoading ? (
            <Loader className='animate-spin' />
          ) : (
            <>
              <Goal /> Continue with Google
            </>
          )}
        </Button>
        <Button variant='secondary' size='md' onClick={() => navigator("/")}>
          <User2 /> Continue without login
        </Button>
      </div>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary py-6'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
