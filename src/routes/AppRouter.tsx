import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Callback from "../pages/Callback";
import CreateElectionPage from "../pages/CreateElectionPage";
import OverviewPage from "../pages/OverviewPage";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<OverviewPage />} />
        <Route path='/elections/create' element={<CreateElectionPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/callback' element={<Callback />} />
    </Routes>
  );
};

export default AppRouter;
