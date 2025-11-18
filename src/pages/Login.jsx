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
    // basic validation
    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await login({ email: data.email, password: data.password });
      navigate("/"); // redirect after login
    } catch (err) {
      // error already shown by AuthContext toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      // handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[380px] text-center border rounded-2xl px-8 py-8 bg-white dark:bg-zinc-900"
        >
          <h1 className="text-3xl font-medium mb-2">Login</h1>
          <p className="text-sm text-zinc-500 mb-6">Please sign in to continue</p>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email id"
              className="w-full h-11 rounded-full border px-4 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
              className="w-full h-11 rounded-full border px-4 outline-none"
              required
            />
          </div>

          <div className="text-left mb-3">
            <Link to="/forgot" className="text-sm text-indigo-500">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full text-white bg-indigo-500 mb-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-11 rounded-full border mb-3"
          >
            Continue with Google
          </button>

          <p className="text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
