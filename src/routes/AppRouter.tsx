import CreateElectionPage from "@/pages/CreateElectionPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/create-election' element={<CreateElectionPage />} />
    </Routes>
  );
};

export default AppRouter;
