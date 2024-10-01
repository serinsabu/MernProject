import { useState } from "react";
import useAuth from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const { user } = useAuth();
  // userdata state is used to make sure to not update the contact username and email again later
  const [userData, setUserData] = useState(true);

  // console.log("userData from backend", user);

  if (userData && user) {
    //if both are true, update the contact username and email
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pass data from front end to backend
    try {
      const response = await fetch("http://localhost:4000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const res_data = await response.json();
      // console.log(res_data.reason)
      if (response.ok) {
        setContact(defaultContactFormData);
        toast.success(
          "Message sent successfully. We will get back to you soon :)"
        );
      } else {
        toast.error(res_data.reason ? res_data.reason : res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
          <br />
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img
              src="/images/support.png"
              alt="contact image"
              width={400}
              height={400}
            />
          </div>

          <div className="contact-form">
            {/* contact page main */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="username"
                  required
                  autoComplete="off"
                  name="username"
                  value={contact.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email address"
                  required
                  autoComplete="off"
                  name="email"
                  value={contact.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols={30}
                  rows={6}
                  placeholder="Enter your message"
                  required
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div>
                <button className="btn btn-submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60840.42457992112!2d78.42528614863281!3d17.625203900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8745b191f769%3A0x86e228d70909d7bd!2sFlipkart%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1726892904452!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
