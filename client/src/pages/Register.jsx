import { useState } from "react";
import { BACKEND_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
    //here 'user' is state variable
    //'setuser' is update function
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    //handling the input values
    const handleInput = (e) => {    //in this e we will get the name of the variable plus what is the value of the variable
        console.log(e); //when we will click any key, it will create an event in console, named e and we want to change/modify that
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user, //this is spread operator, which is used to change only that variable out of 4(username, email, phone, password) which is typed by user
            [name]: value,  //we need to make it dynamic so we used []
            //IMPORTANT
            //whatever we will change, be it username, email... [name] will get replace by that and then its value will get modified
            //we are dynamically changing the name of the variable
        });

        //second way of use setUser
        // setUser((prev) => ({
        //     ...prev,
        //     [name]: value,
        // }));
    };

    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //this is to prevent the default behavior of reloading whenever the button is clicked
        console.log(user);

        try {
            //fetch returns a promise, so we need to use await, async
            const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user), //.stringify() converts a variable/value (user Object in this case) to JSON format
            });

            //what is happening here is that if the registration form is filled properly, then the
            //details are in response
            //othewise the details of error, i.e. message, extradetails, are in response
            const res_data = await response.json(); //inside this we will get the msg, token(JWT) of the user
            console.log("response from server", res_data);

            if(response.ok){
                // const res_data = await response.json(); //inside this we will get the msg, token(JWT) of the user
                // console.log("response from server", res_data);
                //now store the token in local storage
                storeTokenInLS(res_data.token); //this is defined in "..store/auth.jsx"
                // localStorage.setItem("token", res_data.token);
                //we can do this, this way, but then we have to write this line everywhere
                //so the power to send data from parent to any child is achieved by "context API", we can do props drilling easily
                //can be done by Redux as well, but we will do it by React hooks

                setUser({
                    username:"",
                    email:"",
                    phone:"",
                    password:"",
                });
                toast.success("Registration successful, Logged In :)");
                navigate("/");
            }
            else{
                // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            console.log(response);
        } catch (error) {
            console.log("registeration error", error);
        }
    };
    //IMPORTANT: now when we click on Submit button, we'll get an error about CORS policy
    //The CORS Cross-Origin Resource Sharing policy is a security feature implemented by web browsers to restrict webpages from making
    // requests to a different domain than the one that served the webpage.
    //In the context of a MERN stack application, you might encounter CORS issues when the frontend (React) and backend (Express.js)
    //are hosted on different domains.

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img 
                                src="/images/register.png" 
                                alt="Registration image"
                                width="500"
                                height="500"
                            />
                        </div>

                        {/* let's code registration form */}
                        <div className="registration-form">
                            <h1 className="main-heading mb3">Registration form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        placeholder="username" 
                                        id="username" 
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>
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
                                    <label htmlFor="phone">phone</label>
                                    <input 
                                        type="number" 
                                        name="phone" 
                                        placeholder="phone" 
                                        id="phone" 
                                        required
                                        autoComplete="off"
                                        value={user.phone}
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
                                    Register now
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
};