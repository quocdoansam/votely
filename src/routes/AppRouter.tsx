import Callback from "@/pages/Callback";
import CreateElectionPage from "@/pages/CreateElectionPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import OverviewPage from "@/pages/OverviewPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path='' element={<OverviewPage />} />
        <Route path='elections/create' element={<CreateElectionPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/callback' element={<Callback />} />
    </Routes>
  );
};

export default AppRouter;
