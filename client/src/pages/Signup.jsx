import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5174/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password) => {
    const strength = {
      0: { label: "Weak", color: "text-red-500" },
      1: { label: "Medium", color: "text-yellow-500" },
      2: { label: "Strong", color: "text-green-500" },
    };

    let score = 0;

    // checks if password contains Lowercase or Uppercase letter, symbol, number
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) {
      score++;
    }

    if (password.length >= 8) {
      score++;
    }

    return strength[score];
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-slate-100 rounded-md shadow-xl">
        <h2 className="md:text-left text-center text-xl font-bold text-slate-500">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                className="w-full p-2 border rounded-md"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {password && (
              <p className="text-sm mt-2 font-bold">
                Password Strength:{" "}
                <span className={passwordStrength.color}>
                  {passwordStrength.label}
                </span>
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 font-medium"
          >
            Sign Up
          </button>
          <span className="block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
