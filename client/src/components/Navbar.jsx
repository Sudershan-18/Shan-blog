import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    return(
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Shan</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li> <NavLink to="/"> Home </NavLink> </li>
                            <li> <NavLink to="/about"> About </NavLink> </li>
                            {/* <li> <NavLink to="/service"> Services </NavLink> </li> */}
                            <li> <NavLink to="/blogs"> Blogs </NavLink> </li>
                            {isLoggedIn ? (<>
                                <li> <NavLink to="/create"> Create blog </NavLink> </li>
                                </>) : (<></>)
                            }
                            <li> <NavLink to="/contact"> Contact </NavLink> </li>
                            { isLoggedIn ? 
                            //right now the only problem is that the navbar is not changing when I am logged in
                            //this is cuz the value of isLoggedIn is dependent on 'token' in auth.jsx
                                (<>
                                    <li> <NavLink to="/logout"> Logout </NavLink> </li>
                                </>)
                                : (<>
                                    <li> <NavLink to="/login"> Login </NavLink> </li>
                                    <li> <NavLink to="/register"> Sign Up </NavLink> </li>
                                </>)
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};