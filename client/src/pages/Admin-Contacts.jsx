import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    const { authorizationToken } = useAuth();

    const getAllContactsData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/contacts`, {
                method: "GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`contacts ${data}`);
            setContacts(data);
            
        } catch (error) {
            console.log("admin-contacts error", error);
        }
    };

    // delete logic for deleteContact
    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization: authorizationToken,
                },
            });
    
            const data = await response.json();
            console.log(`contacts after deletion: ${data}`);

            if(response.ok){
                getAllContactsData();
                toast.success("Contact deleted successfully.");
            }
            else{
                toast.error("Not able to delete contact!");
            }
        } catch (error) {
            console.log(`deleteContact error: ${error}`);
        }
    };

    useEffect(() => {
        getAllContactsData();
    },[]);

    return(<>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Contacts' data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.map((curContact, index) => {
                            return (
                                <tr key={index}>
                                    <td>{curContact.username}</td>
                                    <td>{curContact.email}</td>
                                    <td>{curContact.message}</td>
                                    {/* <td>Delete</td> */}
                                    <td>
                                        <button onClick={() => deleteContact(curContact._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section> 
    </>);
};