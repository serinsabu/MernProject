import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // update the values in the UI
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { serverTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pass frontend login data to backend
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), //convert object to JSON
      });
      // console.log("login user data", user);
      // console.log("login", response);

      const res_data = await response.json();
      serverTokenInLS(res_data.token);

      if (response.ok) {
        // setUser({
        //   email: "",
        //   password: "",
        // });
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(res_data.reason ? res_data.reason : res_data.message);
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="login image"
                  width={500}
                  height={500}
                />
              </div>

              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <button type="submit" className="btn btn-submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
