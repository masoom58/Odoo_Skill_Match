import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import LandingPage from "./features/landing/LandingPage";
// import Dashboard from "./features/dashboard/Dashboard"; // fix capitalization if used
import Swapreq from './features/swapreq/Swapreq';
import Myswaps from './features/myswaps/Myswaps';
import Notification from './features/notification/Notification';
import Dashboard from "./features/dashboard/dashboard";
import ConnectionPage from "./features/liveLearning/Livelearning";

function AppContent() {
  const routesArray = [
    { path: "/", element: <Navigate to="/login" /> }, // home route redirects to /login
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/landing", element: <LandingPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/connection", element: <ConnectionPage /> },
      { path: "/swapreq", element: <Swapreq /> },
   
     { path: "/myswap", element: < Myswaps /> },
    
          { path: "/notification", element: < Notification /> },
   
      { path: "/landing", element: <LandingPage /> },
    // { path: "/profile", element: <Dashboard /> },
    { path: "*", element: <Navigate to="/login" /> } // catch-all to login
  ];

  const routesElement = useRoutes(routesArray);

 
  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-grow">{routesElement}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;






