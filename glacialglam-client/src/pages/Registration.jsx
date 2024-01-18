import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import TextInput from "../ui/TextInput";
import Error from "../ui/Error";
import { useRegisterMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [role,setRole] = useState("user");

  const [register, { data, isLoading, isError, isSuccess}] =
    useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if  (isSuccess) {
        navigate("/login");
      }
  }, [data, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 1) {
      toast.error("Password should be at least 6 characters long");
    } else {
      const userData = {
        username,
        email,
        password,
        role,
      };
      register(userData);
    }
  };
  return (
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
              Create your account
            </h2>
          </div>

          <form onSubmit={onSubmit} className="mt-6">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <select
              name="role"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="input-field my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="text-center">
              <button className="btn btn-active btn-neutral" type="submit">
                Register
              </button>
            </div>

            {isError && toast.error(" Something error") && <Error message="there was an error" />}
            {isLoading && toast.info("Loading...")}
            {isSuccess && toast.success(" Registration Successful")}
          </form>
        </div>
      </div>
    </div>
  );
}
