import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import About from "./Pages/About";
import Signup from "./Pages/Signup.jsx";
import Service from "./Pages/Service.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import AddProduct from "./Pages/addProduct.jsx";

import getAllProducts from "./customHooks/getAllProduct.js";

const LayoutWithNavbar = () => {
  getAllProducts();

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>

        <Route path="signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
