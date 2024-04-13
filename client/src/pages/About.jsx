import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";
import { useEffect } from "react";

export const About = () => {
    const { user, useAuthentication, isLoggedIn } = useAuth();
    //this is the simple way
    //but if we want we can do this in the same way we did in the contact.jsx
    //i.e. using useState, to set the value of username only once with the help of another variable

    // useEffect(() => {
    //     useAuthentication();
    // }, [user]);

    useEffect(() => {
        if (isLoggedIn) {
            useAuthentication();
        }
    }, [isLoggedIn]);

    return(
        <>
            <main>
                {/* First section */}
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            {isLoggedIn ? (<>
                                    <p>Hi, <span>{user.username}</span> 😉</p>
                                </>) : (<>
                                    <p>Paragraph 1</p>
                                </>)
                            }
                            {/* <p>Paragraph 1</p> */}
                            <h1>Who am I?</h1>
                            <p>
                                Lorem epsum paragraph 2
                            </p>
                            <div className="btn btn-group">
                                <NavLink to="/contact">
                                    <button className="btn">Connect Now</button>
                                </NavLink>
                                <NavLink to="/service">
                                    <button className="btn secondary-btn">Learn More</button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hero-image">
                            <img
                                src="/images/about.png"
                                alt="About page image"
                                width="500"
                                height="500"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* second section */}
            <Analytics />

        </>
    );
};