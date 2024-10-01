import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AdminLayout from "./layouts/Admin-Layout";
import AdminUsers from "./pages/Admin-Users";
import AdminContacts from "./pages/Admin-Contacts";
import AdminUpdate from "./pages/Admin-Update";

const App = () => {
  return (
    <>
      {/* stores current location in the browser's address */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* 404 error page, * means any endpoint other than the current ones then redirect  */}
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            {/* Add the Edit User Route Here */}
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
