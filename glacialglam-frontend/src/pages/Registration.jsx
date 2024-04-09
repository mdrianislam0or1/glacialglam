import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";
import CommonInput from "../ui/CommonInput";
import Error from "../ui/Error";
import Spinner from "../ui/Spinner";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("0123456789");
  const [address, setAddress] = useState("123 Street");
  const [about, setAbout] = useState("I am a user");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState(null); // State to store uploaded image
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=1649fb6f862db7406016a17722160f94`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.data.url); // Set the image URL after successful upload
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
    } else {
      try {
        const userData = {
          username,
          email,
          password,
          phone,
          address,
          about,
          role,
          image: image || "", // Include image URL in user data
        };

        const response = await register(userData);

        if (response.error) {
          console.error("Error registering user:", response.error);
        } else {
          console.log("New user registered:", response.data);
          toast.success("Registration Successful");
          resetForm();
        }
      } catch (error) {
        console.error("Error registering user:", error.message);
        toast.error("Something went wrong");
      }
    }
  };

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setAbout("");
    setRole("user");
    setImage(null);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-sky-200 gap-8">
        <div className="">
          <img className="w-full h-screen object-cover" src="/1.png" alt="" />
        </div>
        <div className="flex items-center justify-center px-4 py-4">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-xl uppercase text-black">Register</h2>
            </div>

            <form onSubmit={onSubmit} className="mt-6">
              {/* Add input field for image upload */}
              <input type="file" accept="image/*" onChange={handleImageUpload} />

              <CommonInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <CommonInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CommonInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <CommonInput
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <CommonInput
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <CommonInput
                type="text"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full my-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
              >
                <option value="user">User</option>
                {/* <option value="admin">Admin</option> */}
              </select>
              <div className="text-center">
                <button className="w-full bg-black text-white py-2 px-4 mt-4 hover:bg-black" type="submit">
                  Register
                </button>
              </div>

              {isError && <Error message="There was an error" />}
              {isLoading && <>
                <Spinner/>
              </>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
