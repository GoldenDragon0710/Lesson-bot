import { Home, Setting } from "@/pages";

export const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Setting",
    path: "/setting",
    element: <Setting />,
  },
];

export default routes;
