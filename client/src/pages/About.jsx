import { NavLink } from "react-router-dom";
import Analytics from "../components/Analytics";
import useAuth from "../store/auth";
import { useEffect, useState } from "react";

const About = () => {
  const { user } = useAuth();
  // console.log("user from backend", user);
  return (
    <>
      <main>
        <section className="section-about">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome, {user ? user.username : ""} </p>
              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Ready to take the first step towards a more efficient
                and secure IT infrastructure?
              </p>
              <p>
                Customisation: Ready to take the first step towards a more
                efficient and secure IT infrastructure?
              </p>
              <p>
                Affordability: Ready to take the first step towards a more
                efficient and secure IT infrastructure?
              </p>
              <p>
                Reliability: Ready to take the first step towards a more
                efficient and secure IT infrastructure?
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">connect now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="about image"
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* section - 2 */}
        <Analytics />
      </main>
    </>
  );
};

export default About;
