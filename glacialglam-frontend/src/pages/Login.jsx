import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
import Success from "../ui/Success";
import CommonInput from "../ui/CommonInput";


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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-sky-200 gap-8 ">
        <div className="">
          <img
            className=" w-full h-screen object-cover"
            src="/2.png"
            alt=""
          />
        </div>
        <div className=" flex items-center justify-center px-4 py-4">
          <div className="max-w-md w-full space-y-8">
            <div>
             
              <h2 className="mt-6 text-center text-xl uppercase text-black">
                Sign in to your account
              </h2>
            </div>

            <form onSubmit={onSubmit} className="">
              <CommonInput
                type="text"
                name="username"
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Username"
               
              />
              <CommonInput
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
               
              />
              <div className="text-center">
                <button className=" w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black" type="submit">
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
