import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import EmptyLayout from "src/layouts/EmptyLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import WelcomeLayout from "./layouts/WelcomeLayout";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Welcome

const Login = Loader(lazy(() => import("src/content/welcomePages/Login")));
const Create = Loader(lazy(() => import("src/content/welcomePages/Create")));
const Verification = Loader(
  lazy(() => import("src/content/welcomePages/Verification"))
);

// Configuration

const AppConfiguration = Loader(
  lazy(() => import("src/content/appPages/Configuration"))
);

// // Profile

const AccountInfo = Loader(
  lazy(() => import("src/content/appPages/AccountInfo"))
);

// // Users

// const Users = Loader(lazy(() => import('src/content/pages/Users')));
// const UpdateUserPage = Loader(lazy(() => import('src/content/pages/Users/Update')));

// Status

const Status404 = Loader(
  lazy(() => import("src/content/basePages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/basePages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/basePages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/basePages/Status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <WelcomeLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/welcome/login" replace />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "welcome",
    element: <WelcomeLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "status",
    element: <EmptyLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="404" replace />,
      },
      {
        path: "404",
        element: <Status404 />,
      },
      {
        path: "500",
        element: <Status500 />,
      },
      {
        path: "maintenance",
        element: <StatusMaintenance />,
      },
      {
        path: "coming-soon",
        element: <StatusComingSoon />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "home",
    element: <SidebarLayout />,
    children: [
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  // {
  //   path: 'users',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Users />
  //     },
  //     {
  //       path: 'edit',
  //       element: <UpdateUserPage />
  //     },
  //     {
  //       path: '*',
  //       element: <Status404 />
  //     }
  //   ]
  // },
  {
    path: "configuration",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <AppConfiguration />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "account",
    element: <SidebarLayout />,
    children: [
      {
        path: "update",
        element: <AccountInfo />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

export default routes;
