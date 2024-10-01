import { useEffect, useState } from "react";
import useAuth from "../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const { authorizationToken } = useAuth();
  const params = useParams();

  const [users, setUsers] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/users/${params.id}`,
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

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUsers({ ...users, [name]: value });
  };

  // to update data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // passing data accordingly the update user id from admin controller screen
      const response = await fetch(
        `http://localhost:4000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(users),
        }
      );

      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      next(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="container">
          <h1 className="main-heading">Update User Data</h1>
          <br />
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  autoComplete="off"
                  onChange={handleInput}
                  value={users.username}
                  required
                />
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="enter your email address"
                  autoComplete="off"
                  onChange={handleInput}
                  value={users.email}
                  required
                />
              </div>
              <div>
                <label htmlFor="Phone">Mobile</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="mobile number"
                  autoComplete="off"
                  onChange={handleInput}
                  value={users.phone}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default AdminUpdate;
