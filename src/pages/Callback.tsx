import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { magic } from "../lib/magic";
import { Badge } from "lucide-react";
import { User } from "../types/User";

export default function Callback() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const result = await magic.oauth2.getRedirectResult({});

        const userInfo = result.oauth.userInfo;
        const metadata = await magic.user.getInfo();

        const fortmattedUser: User = {
          name: userInfo.name ?? userInfo.email?.split("@")[0] ?? "Unknown",
          email: userInfo.email ?? metadata.email ?? "",
          walletAddress: metadata.publicAddress || "",
          avatarUrl:
            userInfo.picture ??
            `https://api.dicebear.com/6.x/identicon/svg?seed=${userInfo.publicAddress}`,
        };

        localStorage.setItem("user", JSON.stringify(fortmattedUser));
        await fetchUser();

        navigate("/");
      } catch (err: any) {
        if (
          err?.code === -32600 &&
          err?.message?.includes("Skipped remaining OAuth verification steps.")
        ) {
          console.warn("Already logged in, skipping redirect handling.");
          await fetchUser();
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
      <Badge className='animate-[spin_2s_ease_infinite]' size={72} />
    </div>
  );
}
