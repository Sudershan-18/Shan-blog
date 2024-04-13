import { useState } from "react";
import { BACKEND_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
            });

            const res_data = await response.json();
            if(response.ok){
                //now store the token in local storage
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token", res_data.token);
                
                // alert("Login successful :)");
                setUser({
                    email:"",
                    password:"",
                });
                toast.success("Logged In :)");
                navigate("/");
            }
            else{
                // alert("Invalid credentials!!");
                // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            console.log(response);
        } catch (error) {
            console.log("login error", error);
        }
    }

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img 
                                src="/images/login.png" 
                                alt="Login image"
                                width="500"
                                height="500"
                            />
                        </div>

                        {/* let's code login form */}
                        <div className="registration-form">
                            <h1 className="main-heading mb3">Login form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="enter your email" 
                                        id="email" 
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="password" 
                                        id="password" 
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Login now
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
};