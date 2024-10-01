import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAuth from "../store/auth";

function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user.isAdmin) {
    //if user admin is false, navigate to home directly, do not given admin page access
    return <Navigate to="/home" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav className="adminNav">
            <ul>
              <li>
                <NavLink to="/admin/users">users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">contacts</NavLink>
              </li>
              <li>
                <NavLink to="">services</NavLink>
              </li>
              <li>
                <NavLink to="">home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* nested routes can be shown using this */}
      <Outlet />
    </>
  );
}

export default AdminLayout;
