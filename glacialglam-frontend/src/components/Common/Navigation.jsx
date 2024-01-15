import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };
    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/">
                        <img
                            className="h-10"
                            src=""
                            alt="Glacial Glam Logo "
                        />
                    </Link>
                    <ul>
                        <li className="text-white">
                            
                            <span className="cursor-pointer" onClick={logout}>
                                Logout
                            </span>

                        </li>
                        <li className="text-white">
                            
                           <Link to='/register'> Registration</Link>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}