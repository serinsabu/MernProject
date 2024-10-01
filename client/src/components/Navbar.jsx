//navlink - special kind of link that knows whether or not it is active, pending or transitioning
import { NavLink } from "react-router-dom"; // to avoid reloading
import "./Navbar.css";
import useAuth from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  // console.log("isLoggedIn", isLoggedIn);

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Serin's Tech Page </NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Service</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
