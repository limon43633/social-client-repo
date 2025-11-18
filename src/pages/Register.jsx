// src/pages/Register.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onChangeHandler = (e) =>
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validatePassword = (pw) => {
    // at least one uppercase, one lowercase, min length 6
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!validatePassword(data.password)) {
      toast.error(
        "Password must be at least 6 characters, contain uppercase and lowercase letters"
      );
      return;
    }

    try {
      setLoading(true);
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        photoURL: data.photoURL,
      });
      navigate("/");
    } catch (err) {
      // error shown in context
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
          <h1 className="text-3xl font-medium mb-2">Register</h1>
          <p className="text-sm text-zinc-500 mb-6">Create your account</p>

          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Full name"
            className="w-full h-11 rounded-full border px-4 mb-3 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Email"
            className="w-full h-11 rounded-full border px-4 mb-3 outline-none"
            required
          />
          <input
            name="photoURL"
            value={data.photoURL}
            onChange={onChangeHandler}
            placeholder="Photo URL (optional)"
            className="w-full h-11 rounded-full border px-4 mb-3 outline-none"
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="w-full h-11 rounded-full border px-4 mb-3 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full text-white bg-indigo-500 mb-3"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-sm text-zinc-500">
            Already have an account? <Link to="/login" className="text-indigo-500">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
