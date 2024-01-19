import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/login");
  };

  // Use a more specific selector to access user data
  const { token, user } = useSelector((state) => state.auth) || {};

  // Check if user data is available
  const isUserAvailable = !!token && !!user;

  console.log("Redux state:", { token, user });


  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><NavLink to="/">Home</NavLink></li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
           
          <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register"> Registration</Link>
            </li>

            <li>
              <Link to="/admin/create-product">Create Product</Link>
            </li>
            
          </ul>
        </details>
      </li>
      <li><NavLink to="/profile">{user?.username}Profile</NavLink></li>
             {token ?
                  ( <li>
                    <NavLink onClick={logout}>
                    Logout    
                    </NavLink>
                  
                </li>) : 
             
     
             (<li><NavLink to="/login">Login</NavLink></li>)
           }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Glacial Glam</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/cart">Cart</NavLink></li>
      <li>
        <details>
          <summary>Admin</summary>
          <ul className="p-2">
           
            <li>
              <Link to="/admin/all-order">All Order</Link>
            </li>
            <li>
              <Link to="/admin/create-product">Create Product</Link>
            </li>
            
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
           
          <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register"> Registration</Link>
            </li>
            <li>
              <Link to="/cart"> Cart</Link>
            </li>

           
            
          </ul>
        </details>
      </li>
      <li><NavLink to="/profile">{user?.username}Profile</NavLink></li>
             {token ?
                  ( <li>
                    <NavLink onClick={logout}>
                    Logout    
                    </NavLink>
                  
                </li>) : 
             
     
             (<li><NavLink to="/login">Login</NavLink></li>)
           }
          
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>

  );
}
