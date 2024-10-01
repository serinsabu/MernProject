import Analytics from "../components/Analytics";

const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to This Page</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Technical, we
                specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="homepage image"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        {/* section - 2 */}
        <Analytics />

        {/* section -3 */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-image">
              <img
                src="/images/services.png"
                alt="service image"
                width={500}
                height={500}
              />
            </div>

            <div className="hero-content">
              <p>We are here for you</p>
              <h1>Get started today</h1>
              <p>
                Ready to take the first step towards a more efficient and secure
                IT infrastructure? Contact us today for a free consultation and
                let's discuss how Thapa Technical can help your business thrive
                in the digital age.
              </p>

              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
