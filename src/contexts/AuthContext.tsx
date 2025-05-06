import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { magic } from "../lib/magic";
import { AuthContextType } from "@/types/AuthContextType";
import { User } from "@/types/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const loggedIn = await magic.user.isLoggedIn();
      if (!loggedIn) {
        setUser(null);
        localStorage.removeItem("user");
        return;
      }

      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
        return;
      }

      const info = await magic.user.getInfo();
      const formattedUser: User = {
        name: info?.email?.split("@")[0] || "Unknown",
        email: info.email || "",
        walletAddress: info.publicAddress || "",
        avatarUrl: `https://api.dicebear.com/6.x/identicon/svg?seed=${info.publicAddress}`,
      };

      setUser(formattedUser);
      localStorage.setItem("user", JSON.stringify(formattedUser));
    } catch (err) {
      console.error("Error fetching user: ", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await magic.user.logout();
    } catch (err) {
      console.error("Error logging out: ", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      setIsLoading(false);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: !!user,
        isLoading: isLoading,
        logout: logout,
        fetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
