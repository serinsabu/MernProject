import useAuth from "../store/auth";

const Service = () => {
  const { servicesData } = useAuth();
  // console.log("servicesData", servicesData);

  return (
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>

        <div className="container grid grid-three-cols">
          {servicesData.map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-image">
                  <img src="/images/design.png" alt="services image" />
                </div>

                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{item.provider}</p>
                    <p>{item.price}</p>
                  </div>

                  <h2>{item.service}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Service;
