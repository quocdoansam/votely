import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
        const metadata = await magic.user.getInfo();

        const user = {
          name: userInfo.name ?? null,
          avatarUrl: userInfo.picture ?? null,
          email: userInfo.email ?? null,
          publicAddress: metadata.publicAddress,
        };

        localStorage.setItem("user-info", JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);

        navigate("/");
      } catch (err: any) {
        if (
          err?.code === -32600 &&
          err?.message?.includes("Skipped remaining OAuth verification steps.")
        ) {
          console.warn("Already logged in, skipping redirect handling.");
          const metadata = await magic.user.getInfo();
          const user = {
            name: metadata.email?.split("@")[0] ?? null,
            avatarUrl: metadata.email?.charAt(0) ?? null,
            email: metadata.email,
            publicAddress: metadata.publicAddress,
          };
          setUser(user);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          console.error("OAuth callback error:", err);
          navigate("/");
        }
      }
    })();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Loader2 className='animate-spin' />
    </div>
  );
}
