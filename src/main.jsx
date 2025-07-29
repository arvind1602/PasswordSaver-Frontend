import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";    
import "./style.css";
import Home from "./pages/Home.jsx";
import SplashManager from "./components/SplashManager.jsx";
import About from "./pages/About.jsx";
import SignIn from "./features/auth/SignIn.jsx";
import Signup from "./features/auth/Signup.jsx";
import Vault from "./pages/Vault.jsx";
import UpdatePassword from "./features/password/UpdatePassword.jsx";
import AddPassword from "./features/password/AddPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<SplashManager />} />
      <Route path="/home" element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
      <Route path="vault" element={<Vault />} />
      <Route path="vault/update-password" element={<UpdatePassword />} />
      <Route path="vault/add-password" element={<AddPassword />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
