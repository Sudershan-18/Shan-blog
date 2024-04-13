import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const { authorizationToken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/users`, {
                method: "GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json(); //yes .json() converts the data from json format to object
            console.log(`users ${data}`);
            setUsers(data);
            
        } catch (error) {
            console.log("admin-users error", error);
        }
    };

    //delete logic for deleteUser
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization: authorizationToken,
                },
            });
    
            const data = await response.json();
            console.log(`users after deletion: ${data}`);
            //the thing here is that yes the user is deleted but then we have to refresh the page cuz we want to re-render
            //now for that we need to call the getallusersdata() again, so this function will be called once when the page 
            //is accessed and then again when a user is deleted.

            if(response.ok){
                getAllUsersData();
                toast.success("User deleted successfully.")
            }
            else{
                toast.error("Not able to delete user!");
            }
        } catch (error) {
            console.log(`deleteUser error: ${error}`);
        }
    };

    useEffect(() => {
        getAllUsersData();
    },[]);

    return(<>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users' data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((curUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        {/* When you need to use style or class attributes on active <Link>, then you can use <NavLink> */}
                                        <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(curUser._id)}>Delete</button>
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