import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Payment from "./pages/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/Private/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Common/Home";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Cart from "./pages/Order/Cart";
import ProcessOrder from "./pages/Order/ProcessOrder";
import MyOrderProfile from "./pages/Customer/MyOrderProfile";
import MyOrder from "./pages/Order/MyOrder";
import GetAllOrder from "./pages/Admin/GetAllOrder";

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication</div>
  ) : (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/process-order" element={<ProcessOrder />} />
        <Route path="/profile" element={<MyOrderProfile />} />
        <Route path="/orders/myOrder/:orderId" element={<MyOrder />} />
        <Route path="/products/:productId/reviews" element={<ProductDetails />} />
        {/* admin */}
        
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/all-order" element={<GetAllOrder />} />
        
        <Route path="/admin/update-products/:productId" element={<UpdateProduct />} />


        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* <Route
            path="/"
            element={
               
                    <Payment />
               
            }
        /> */}

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
