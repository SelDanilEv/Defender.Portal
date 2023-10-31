import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loader(lazy(() => import("src/content/index")));

// Configuration

const AppConfiguration = Loader(
  lazy(() => import("src/content/pages/Configuration"))
);

// // Profile

const AccountInfo = Loader(lazy(() => import("src/content/pages/AccountInfo")));

// // Users

// const Users = Loader(lazy(() => import('src/content/pages/Users')));
// const UpdateUserPage = Loader(lazy(() => import('src/content/pages/Users/Update')));

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "status",
    element: <BaseLayout />,
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
