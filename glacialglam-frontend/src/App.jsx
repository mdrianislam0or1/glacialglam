import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Registration';
import Payment from './pages/Payment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/Private/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Navigation from './components/Common/Navigation';

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication</div>
  ):(
    <Router>
      <Navigation/>
    <Routes>
        <Route
            path="/"
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
</Router>
  )
}

export default App