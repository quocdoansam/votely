import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { magic } from "../lib/magic";

interface UserInfo {
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  publicAddress: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isFetching: boolean;
  user: UserInfo | null;
  logout: () => Promise<void>;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (value: UserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const loggedIn = await magic.user.isLoggedIn();
        if (loggedIn) {
          const stored = localStorage.getItem("user-info");
          if (stored) {
            setUser(JSON.parse(stored));
          } else {
          }
        }
        setIsLoggedIn(loggedIn);
      } catch (err) {
        console.error("Error restoring session:", err);
      } finally {
        setIsFetching(false);
      }
    };

    init();
  }, []);

  const logout = async () => {
    await magic.user.logout();
    localStorage.removeItem("user-info");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isFetching,
        user,
        logout,
        setIsLoggedIn,
        setUser,
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
