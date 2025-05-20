import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../../lib/magic";
import Button from "../button/Button";
import Input from "../input/Input";
import InputGroup from "../input/InputGroup";
import Alert from "../Alert";
import GoogleIcon from "../../assets/icons/google.svg";
import { useAuth } from "../../contexts/AuthContext";
import Divider from "../Divider";

export function LoginForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [isEmailLoading, setEmailLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const { fetchUser } = useAuth();
  const navigator = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email) {
      setError("This field is required.");
      return;
    }
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
      });
    } catch (error) {
      console.error("Error login with Google:", error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      <form
        className='flex flex-col gap-3'
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <InputGroup>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            placeholder='votely@example.com'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        {error && <Alert variant='danger'>{error}</Alert>}

        <Button variant='primary' size='md'>
          {isEmailLoading ? "LOGGING ..." : "LOGIN"}
        </Button>
      </form>
      <Divider />
      <Button
        variant='secondary'
        size='md'
        onClick={loginWithGoogle}
        className='justify-between'
      >
        {isGoogleLoading ? (
          "Please wait ..."
        ) : (
          <>
            <img src={GoogleIcon} alt='Google' className='size-6' />
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
}
