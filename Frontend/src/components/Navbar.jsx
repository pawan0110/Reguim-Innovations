import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <header className="w-full bg-white">
      <nav className="max-w-6xl mx-auto h-20 px-6 flex  items-center justify-center gap-60">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Regium Innovations"
            className="w-11 h-11 object-contain"
          />
          <span className="text-black font-semibold tracking-widest text-sm">
            REGIUM  INNOVATIONS
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm uppercase tracking-wide">

          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Service", path: "/service" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                relative pb-1
                text-black
                after:absolute after:left-0 after:-bottom-0.5
                after:h-px after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full
                ${isActive ? "after:w-full" : ""}
              `
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Login */}
          <Link
            to="/login"
            className="
              ml-4 px-4 py-1.5
              border border-black
              text-black
              rounded-full
              hover:bg-black hover:text-white
              transition-all duration-300
            "
          >
            Login
          </Link>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
