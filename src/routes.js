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
import BalanceSheet from "views/Dashboard/BalanceSheet";
import Debits from "views/Dashboard/Debits";
import Pending from "views/Dashboard/Pending";
import Currencies from "views/Dashboard/Currencies";

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
    name: "Expenses",
    icon: <CreditIcon color="inherit" />,
    secondaryNavbar: true,
    component: Expenses,
    layout: "/admin",
  },
  {
    path: "/currencies",
    name: "Currencies",
    icon: <CreditIcon color="inherit" />,
    secondaryNavbar: true,
    component: Currencies,
    layout: "/admin",
  },
  // {
  //   path: "/pending-payments",
  //   name: "Pending Payments",
  //   icon: <CreditIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: Pending,
  //   layout: "/admin",
  // },
  {
    path: "/balance-sheet",
    name: "Balance Sheet",
    icon: <StatsIcon color="inherit" />,
    secondaryNavbar: true,
    component: BalanceSheet,
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
