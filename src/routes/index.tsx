import { Home } from "lucide-react";
import Callback from "../pages/Callback";
import CreateSurvey from "../pages/dashboard/CreateSurvey";
import DashBoard from "../pages/dashboard/DashBoard";
import Error404 from "../pages/errors/Error404";
import Login from "../pages/Login";

const routes = [
  {
    path: "/",
    element: <DashBoard />,
    children: [
      { path: "", element: <Home /> },
      { path: "create-survey", element: <CreateSurvey /> },
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
