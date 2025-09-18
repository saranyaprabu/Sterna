// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Enter email address"),
    password: Yup.string()
      .min(8, "Password should contain a minimum of 8 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    clearErrors();
    setErrorMsg("");
  }, [clearErrors]);
  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="px-3 py-1 rounded-sm bg-sky-400 text-white font-bold text-sm">
              STERNA
            </div>
            <div className="text-sky-500 font-semibold text-sm">SELYEK</div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Login to account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email &amp; password/OTP to login
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-rose-200 focus:ring-rose-200"
              }`}
            />
            <p className="text-xs text-rose-500 mt-1">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 pr-10 ${
                  errors.password
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-rose-200 focus:ring-rose-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-rose-500 mt-1">
              {errors.password?.message}
            </p>
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-sky-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {(error || errorMsg) && (
            <div className="mb-2 p-2 text-sm text-center text-rose-500 rounded">
              {error || errorMsg}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-2 rounded-md shadow-sm flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Checking..." : "Login using Password"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-xs text-gray-400">OR</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div>
            <button
              type="button"
              className="w-full border border-sky-300 text-sky-600 font-medium py-2 rounded-md"
            >
              Login using OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
