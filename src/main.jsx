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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<SplashManager />} />
      <Route path="/home" element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
      <Route path="vault" element={<Vault />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
