import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(!user.isAdmin){  //when the admin is accessed first the value of user is not defined even if the user is already logged in, so no one can access the admin page be it admin themself or not
        return <Navigate to="/404" />
    }
    
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users">
                                <FaUser /> users
                            </NavLink></li>

                            <li><NavLink to="/admin/contacts">
                                <FaMessage /> contacts
                            </NavLink></li>

                            <li><NavLink to="/">
                                <FaHome /> Home
                            </NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
            {/* the work of Outlet is to show the contents of the nested routes */}
        </>
    );
};