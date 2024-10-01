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
const ResetPassword = Loader(
  lazy(() => import("src/content/welcomePages/ResetPassword"))
);
const Create = Loader(lazy(() => import("src/content/welcomePages/Create")));
const Verification = Loader(
  lazy(() => import("src/content/welcomePages/Verification"))
);
const VerifyEmail = Loader(
  lazy(() => import("src/content/welcomePages/Verification/VerifyEmail"))
);

// Configuration

const AppConfiguration = Loader(
  lazy(() => import("src/content/appPages/Configuration"))
);

// Account

const AccountInfo = Loader(
  lazy(() => import("src/content/appPages/AccountInfo"))
);

// Banking

const Banking = Loader(lazy(() => import("src/content/appPages/Banking")));

// Games

const LotteryHomePage = Loader(
  lazy(() => import("src/content/appPages/Games/Lottery"))
);

const PurchaseLotteryTickets = Loader(
  lazy(() => import("src/content/appPages/Games/Lottery/PurchaseTickets"))
);

// Budget Tracker

const BudgetTrackerDiagramPage = Loader(
  lazy(() => import("src/content/appPages/BudgetTracker/Diagram"))
);

const BudgetTrackerPositionsPage = Loader(
  lazy(() => import("src/content/appPages/BudgetTracker/Positions"))
);

const BudgetTrackerReviewsPage = Loader(
  lazy(() => import("src/content/appPages/BudgetTracker/Review"))
);

// Home

const HomePage = Loader(lazy(() => import("src/content/appPages/HomePage")));

// Amin Users

const AdminUsersPage = Loader(
  lazy(() => import("src/content/appPages/Admin/Users"))
);

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
    element: <EmptyLayout />,
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
        path: "password/reset",
        element: <ResetPassword />,
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
        path: "verify-email",
        element: <VerifyEmail />,
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
        path: "",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "banking",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Banking />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "budget-tracker",
    element: <SidebarLayout />,
    children: [
      {
        path: "diagram",
        element: <BudgetTrackerDiagramPage />,
      },
      {
        path: "positions",
        element: <BudgetTrackerPositionsPage />,
      },
      {
        path: "reviews",
        element: <BudgetTrackerReviewsPage />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "games",
    element: <SidebarLayout />,
    children: [
      {
        path: "lottery",
        children: [
          {
            path: "",
            element: <LotteryHomePage />,
          },
          {
            path: "tickets",
            element: <PurchaseLotteryTickets />,
          },
          {
            path: "*",
            element: <Status404 />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "admin",
    element: <SidebarLayout />,
    children: [
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
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
