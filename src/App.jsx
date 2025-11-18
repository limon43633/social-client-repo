// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import JoinedEvents from "./pages/JoinedEvents";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route
          path="/create-event"
          element={
            <RequireAuth>
              <CreateEvent />
            </RequireAuth>
          }
        />
        <Route
          path="/manage-events"
          element={
            <RequireAuth>
              <ManageEvents />
            </RequireAuth>
          }
        />
        <Route
          path="/joined-events"
          element={
            <RequireAuth>
              <JoinedEvents />
            </RequireAuth>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
