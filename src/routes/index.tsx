import Callback from "../pages/Callback";
import CreateSurvey from "../pages/dashboard/CreateSurvey";
import Dashboard from "../pages/dashboard/Dashboard";
import Error404 from "../pages/errors/Error404";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import SurveyDetails from "../components/survey/SurvayDetail";
import Setting from "../pages/dashboard/Setting";
import Profile from "../pages/user/Profile";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "create", element: <CreateSurvey /> },
      { path: "settings", element: <Setting /> },
      { path: "profile", element: <Profile /> },
      { path: "surveys/:id", element: <SurveyDetails /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;
