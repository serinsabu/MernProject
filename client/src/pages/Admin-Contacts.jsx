import React, { useEffect, useState } from "react";
import useAuth from "../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contactsData, setContactsData] = useState([]);

  const getAllContactsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/getAllContacts",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const contacts = await response.json();
      // console.log("admin contactsData", contactsData);
      setContactsData(contacts);
    } catch (error) {
      next(error);
    }
  };

  // delete contact data

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log("deleted data", response);
      // const dataAfterDeletion = await response.json(); //ui updated right after this line
      // console.log("deleted data", dataAfterDeletion);
      if (response.ok) {
        getAllContactsData();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Could not delete. Try again later");
      }
    } catch (error) {
      next(error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <>
      <div className="admin-contacts-section">
        <div className="container">
          <h1>Admin Contacts</h1>
        </div>

        <div className="container admin-users">
          {contactsData.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.username}</p>
                <p>{item.email}</p>
                <p>{item.message}</p>
                <div>
                  <button type="button" onClick={() => deleteContact(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminContacts;
