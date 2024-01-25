import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
import Success from "../ui/Success";


const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, isLoading, isSuccess,isError }] =
   useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.token && data?.data?.user) {
        localStorage.setItem("auth", JSON.stringify({
          token: data?.data?.token,
          user: data?.data?.user,
        }));
        navigate("/inbox");
      }
      
  }, [data, navigate]);

  console.log(data?.data?.token);

  const onSubmit = (e) => {
    e.preventDefault();

   if(password.length < 1){
    toast.error("Password should be at least 6 characters long");
   }else{
    const userData = {
      username,
      password,
    };
    login(userData);
   }

   
  };

  return (
    <div>
      <div className="grid place-items-center h-screen bg-[#F9FAFB">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <Link to="/">
                <img
                  className="mx-auto h-12 w-auto"
                  src=""
                  alt="Glacial Glam Logo"
                />
              </Link>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <form onSubmit={onSubmit} className="mt-6">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Username"
                className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-center">
                <button className="btn btn-active btn-neutral" type="submit">
                  Login
                </button>
              </div>
              
            {isError && toast.error(" Something error") && <Error message="there was an error" />}
            {isLoading && <Spinner/>}
            {isSuccess && <Success message="Login successful" />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
