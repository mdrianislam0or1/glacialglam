// admin.routes.js
import CreateProduct from "../pages/admin/CreateProduct";
import AdminDashboard from '../pages/admin/AdminDashboard';
import { NavLink } from "react-router-dom";

export const adminPaths = [
  {
    name: "Home",
    path: "Home",
    element: <Home />,
  },
  {
    name: "Glacial Glam Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
      },
    ],
  },
];

// Dynamic routes
export const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

// Sidebar items
export const adminSideBarItems = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => {
        return {
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        };
      }),
    });
  }

  return acc;
}, []);
