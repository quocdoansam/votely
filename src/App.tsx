import { Route, Routes } from "react-router-dom";
import LoginPage from "./app/login/page";
import Callback from "./components/callback";
import { useAuth } from "./context/auth-context";
import { Loader2 } from "lucide-react";
import Page from "./app/dashboard/page";
import CreateElection from "./components/election/create-election";

function App() {
  const { isLoggedIn, isFetching } = useAuth();

  if (isFetching) {
    return (
      <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path='/' element={<Page />}>
          <Route path='create-election' element={<CreateElection />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/callback' element={<Callback />} />
    </Routes>
  );
}

export default App;
