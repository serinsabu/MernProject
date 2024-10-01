import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [servicesData, setServicesData] = useState([]);
  const authorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(true); // to handle admin webpage , only show if the logged user is an admin
  // isloading state is used because user data is undefined first but after sometime data is displayed
  // so using isloading , get the user data until then keep loading then right after the data is reached the user data then
  // stop loading

  //function to stored the token in local storage
  const serverTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  // console.log("token", token);
  // console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT Authentication - to get currently logged in user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("user data from front end", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // services data
  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const service_res = await response.json();
        // console.log("services data", service_res);
        setServicesData(service_res.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceData();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        serverTokenInLS,
        LogoutUser,
        user,
        servicesData,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

export { AuthContext, AuthProvider };
export default useAuth;
