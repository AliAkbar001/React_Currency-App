// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import ManageUsers from "views/Dashboard/ManageUsers";
import ManageCurrency from "views/Dashboard/ManageCurrency";
import Statistics from "views/Dashboard/Statistics";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/manage-users",
    name: "Manage Users",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: ManageUsers,
    layout: "/admin",
  },
  {
    path: "/manage-currency",
    name: "Manage Currency",
    icon: <CreditIcon color="inherit" />,
    secondaryNavbar: true,
    component: ManageCurrency,
    layout: "/admin",
  },
  {
    path: "/statistics",
    name: "Statistics",
    icon: <StatsIcon color="inherit" />,
    secondaryNavbar: true,
    component: Statistics,
    layout: "/admin",
  }
];
export default dashRoutes;
