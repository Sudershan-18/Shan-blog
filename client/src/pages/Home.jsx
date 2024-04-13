import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";
import { useEffect } from "react";

export const Home = () => {
    const { user, useAuthentication, isLoggedIn } = useAuth();

    // useEffect(() => {
    //         useAuthentication();
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
                            <p>Paragraph 1</p>
                            {isLoggedIn ? (<>
                                <h1>
                                    Welcome <span>{user.username}</span>, to my web app 😉
                                </h1>
                                </>) : (<>
                                    <h1>Welcome to my web app ;)</h1>
                                </>)
                            }
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
                                src="/images/home.png"
                                alt="Homepage image"
                                width="500"
                                height="500"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* second section */}
            <Analytics />

            {/* Third section */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img
                            src="/images/design.png"
                            alt="Design image"
                            width="500"
                            height="500"
                        />
                    </div>

                    <div className="hero-content">
                        <p>Paragraph 1</p>
                        {isLoggedIn ? (<>
                            <h1>
                                Welcome <span>{user.username}</span>, to my web app 😉
                            </h1>
                            </>) : (<>
                                <h1>Welcome to my web app ;)</h1>
                            </>)
                        }
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
                </div>
            </section>

        </>
    );
};