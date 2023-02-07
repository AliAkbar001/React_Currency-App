// import
import Dashboard from "views/Dashboard/Dashboard";

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
import Expenses from "views/Dashboard/Expenses";
import Currency from "views/Dashboard/Dashboard/components/Currency";

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
  // {
  //   path: "/manage-currency",
  //   name: "Manage Currency",
  //   icon: <CreditIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: ManageCurrency,
  //   layout: "/admin",
  // },
  {
    path: "/expenses",
    name: "Manage Expenses",
    icon: <StatsIcon color="inherit" />,
    secondaryNavbar: true,
    component: Expenses,
    layout: "/admin",
  },
  // {
  //   path: "/currency",
  //   name: "Currency",
  //   icon: <StatsIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: Currency,
  //   layout: "/admin",
  // }
];
export default dashRoutes;
