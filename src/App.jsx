// src/App.jsx
import React from "react";
import { Toaster } from 'react-hot-toast';
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
import EventDetails from "./pages/EventDetails";
import UpcomingEvents from "./pages/UpcomingEvents";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />

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
        <Route 
          path="/joined-events"
          element={
            <RequireAuth>
            <JoinedEvents />
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

      </Routes>





      <Footer />




      <Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </div>
  );
};

export default App;
