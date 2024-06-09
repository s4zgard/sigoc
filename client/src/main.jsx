import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Shops from "./components/Shops.jsx";
import View from "./components/View.jsx";
import Users from "./components/Users.jsx";
import EditShop from "./components/EditShop.jsx";
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shops" element={<Shops />} />
      <Route path="/view/:shopId" element={<View />} />
      <Route path="/edit/:shopId" element={<EditShop />} />
      <Route path="/users" element={<Users />} />
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
