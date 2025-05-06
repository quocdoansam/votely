import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, LoaderPinwheel } from "lucide-react";
import Logo from "../../public/logo.svg";
import { magic } from "@/lib/magic";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string | null>(null);
  const [isEmailLoading, setEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
      console.error("Login with email failed: ", error);
    } finally {
      setEmailLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await magic.oauth2.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/callback`,
        scope: ["profile", "email"],
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleLogin();
        }}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='#'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex h-15 w-15 items-center justify-center rounded-md'>
                <img src={Logo} alt='Logo' />
              </div>
              <span className='sr-only'>Votely.</span>
            </a>
            <h1 className='text-xl font-bold'>Welcome to Votely.</h1>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='johndoe@example.com'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              {isEmailLoading && (
                <LoaderPinwheel className='animate-spin' size={24} />
              )}
              Login
            </Button>
          </div>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              Or
            </span>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Button variant='outline' className='w-full' type='button'>
              <Github />
              Continue with Github
            </Button>
            <Button
              variant='outline'
              className='w-full'
              type='button'
              onClick={loginWithGoogle}
            >
              {isGoogleLoading ? (
                <LoaderPinwheel className='animate-spin' size={24} />
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                  <path
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                    fill='currentColor'
                  />
                </svg>
              )}
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  '>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
