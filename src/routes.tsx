import {
  CreateWorkPage,
  DisplayWorkPage,
  ListAvailableWorkPage,
  ListOpenWorkPage,
  Login,
  SignUp,
} from "./page";
import { Layout } from "./layout";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    route: [
      { path: "/open-works", element: <ListOpenWorkPage /> },
      { path: "/available-works", element: <ListAvailableWorkPage /> },
      { path: "/create-work", element: <CreateWorkPage /> },
      { path: "/work", element: <DisplayWorkPage /> },
    ],
  },
  { path: "/log-in", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
];
