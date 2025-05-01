import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./app/login/page";
import Callback from "./components/callback";
import Page from "./app/dashboard/page";
import CreateElection from "./components/election/create-election";
import { useAuth } from "./context/auth-context";
import { Loader2 } from "lucide-react";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to='/' replace />;
}

function App() {
  const { isFetching } = useAuth();

  if (isFetching) {
    return (
      <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/callback' element={<Callback />} />

      <Route
        path='/'
        element={
          <RequireAuth>
            <Page />
          </RequireAuth>
        }
      >
        <Route path='create-election' element={<CreateElection />} />
      </Route>
    </Routes>
  );
}

export default App;
