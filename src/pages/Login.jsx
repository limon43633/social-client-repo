// src/pages/Login.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  const onChangeHandler = (e) =>
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await login({ email: data.email, password: data.password });
      navigate("/");
    } catch (error) {
      // error handled inside context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      // handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center bg-[#e5f6f7] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
          <p className="text-gray-400 mb-8 mt-5">
            Sign in to continue making an impact in your community
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-4 text-left">
              <label className="block mb-1 text-sm font-medium">Email Address</label>
              <input
                name="email"
                type="email"
                value={data.email}
                onChange={onChangeHandler}
                placeholder="your@email.com"
                className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="mb-4 text-left">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={data.password}
                onChange={onChangeHandler}
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-[#4fbf8b] focus:border-[#4fbf8b] transition-colors text-gray-400"
              />
            </div>

            <div className="text-right mb-4">
              <Link to="/forgot" className="text-sm text-[#4fbf8b] font-medium hover:text-[#3fa578] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#4fbf8b] text-white rounded-lg font-medium hover:bg-[#3fa578] transition-colors mb-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-3 border text-gray-400 rounded-lg mb-6 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Register link */}
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#4fbf8b] font-medium hover:text-[#3fa578] transition-colors">
              Register
            </Link>
          </p>

          {/* Back to home */}
          <Link
            to="/"
            className="mt-6 inline-block text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;