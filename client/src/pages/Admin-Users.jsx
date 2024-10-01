import React, { useEffect, useState } from "react";
import useAuth from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/getAllUsers",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      //   console.log("data", data);
      setUsers(data);
    } catch (error) {
      next(error);
    }
  };

  //   delete user on click of delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      //   console.log("delete user", data);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      next(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/admin/users/${item._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
