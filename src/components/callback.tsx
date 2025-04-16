import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { magic } from "../lib/magic";
import { Loader2 } from "lucide-react";

export default function Callback() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const result = await magic.oauth2.getRedirectResult({});
        const userInfo = result.oauth.userInfo;

        const user = {
          name: userInfo.name ?? "",
          avatarUrl: userInfo.picture ?? "",
          email: userInfo.email ?? "",
          publicAddress: result.magic.userMetadata.publicAddress ?? "",
        };

        localStorage.setItem("user-info", JSON.stringify(user));
        setUser(user);
      } catch (err: any) {
        if (
          err?.code === -32600 &&
          err?.message?.includes("Skipped remaining OAuth verification steps")
        ) {
          console.warn("Already logged in, skipping redirect handling.");
        } else {
          console.error("OAuth callback error:", err);
        }
      } finally {
        setIsLoggedIn(true);
        navigate("/");
      }
    })();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Loader2 className='animate-spin' />
    </div>
  );
}
