import { Phone } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { use } from "react";

export function Signin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    dispatch(login(user));

    if (from) {
      navigate(from);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50  w-full h-full flex justify-center items-center my-auto bg-black ">
      <div className="absolute top-30 flex gap-5">
        <h1 className="text-3xl font-light text-white">Pizzeria</h1>
        <div className="text-3xl w-0.5 rounded bg-gray-200"></div>
        <img className="h-10" src={logo} />
      </div>
      <div className="bg-white w-1/3 rounded-xl h-fit text-center p-2 py-4">
        <h1 className="text-2xl font-bold">Login to your Account</h1>
        <form className="flex-col space-y-3 m-5" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.email}
            placeholder="Enter your Email"
          />
          <input
            name="password"
            type="password"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.password}
            placeholder="Enter your Password"
          />
          <div className="mt-2">
            <button
              className="bg-black text-white p-2 w-1/3 rounded-xl"
              type="submmit"
            >
              SignIn
            </button>
          </div>
        </form>
        <p>
          New user...?
          <Link to="/signup" state= {location.state}>
            <span className="text-blue-600">SignUp...</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const location =useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((user) => user.email === formData.email);
    if (exists) {
      alert("Email already exists");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("confirm password doesnt match!!!");
      return;
    }
    users.push({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/signin",{
         state: location.state,
    });
  };

  return (
    <div className="fixed inset-0 z-50  w-full h-full flex justify-center items-center my-auto bg-black ">
      <div className="absolute top-20 flex gap-5">
        <h1 className="text-3xl font-light text-white">Pizzeria</h1>
        <div className="text-3xl w-0.5 rounded bg-gray-200"></div>
        <img className="h-10" src={logo} />
      </div>
      <div className="bg-white w-1/3 rounded-xl h-fit text-center p-2 py-4">
        <h1 className="text-2xl font-bold">Create your Account</h1>
        <form className="flex-col space-y-3 m-5" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.name}
            placeholder="Enter your Name"
          />
          <input
            name="email"
            type="email"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.email}
            placeholder="Enter your Email"
          />
          <input
            name="phone"
            type="tel"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.phone}
            placeholder="Enter your Phone no."
          />
          <input
            name="password"
            type="password"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.password}
            placeholder="Enter your Password"
          />
          <input
            name="confirmPassword"
            type="password"
            className="w-8/9 border-2 rounded-lg p-2 border-zinc-700"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.confirmPassword}
            placeholder="Confirm your Password"
          />
          <div className="mt-2">
            <button
              className="bg-black text-white p-2 w-1/3 rounded-xl"
              type="submmit"
            >
              SignUp
            </button>
          </div>
        </form>
        <p>
          Already a user...?{" "}
          <Link to="/signin" state={location.state}>
            <span className="text-blue-600">Signin...</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
