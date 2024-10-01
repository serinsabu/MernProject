import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // handle input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // preserve old value and update the updated ones
    setUser({
      ...user,
      [name]: value,
    });
  };

  /*
  CORS error: (Cross Origin Resource Sharing) policy is a security feature implemented by web browsers
  to restrict web pages from making requests to a different domain than the one that served the webpage.
  // In this project of ours, server is running on port 5000 front end but backend is running on 5173 host
  In the context of a MERN stack application, you might encounter CORS issues when the frontend ( React) and backend( Express)
  are hosted on different domains
  */

  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e) => {
    // avoid reloading when form is clicked by using prevent
    e.preventDefault();
    //pass user data on the backend
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log("registered user data", user);
      // console.log("register", response);
      const res_data = await response.json();
      console.log("res_data", res_data.reason);

      if (response.ok) {
        // empty the input fields after submitting the data
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration successful");
        //navigate to login form if the data is send to backend successfully
        navigate("/login");
      } else {
        toast.error(res_data.reason ? res_data.reason : res_data.message);
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
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="registration image"
                  width={500}
                  height={500}
                />
              </div>

              {/* registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="enter your email address"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="enter your mobile number"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />

                  <div>
                    <button type="submit" className="btn btn-submit">
                      Register
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

export default Register;
