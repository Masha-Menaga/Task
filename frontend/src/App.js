import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Error from "./components/Error";
import ProductiveRoute from "./components/ProductiveRoute";
import { LoginProvider } from "./context/LoginContext";
import User from "./components/User";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import ViewTask from "./components/ViewTask";

const App = () => {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/viewtask" element={<ViewTask />} />

          <Route
            path="/profile"
            element={
              <ProductiveRoute>
                <Profile />
              </ProductiveRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProductiveRoute>
                <User />
              </ProductiveRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProductiveRoute>
                <Admin />
              </ProductiveRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
};

export default App;
