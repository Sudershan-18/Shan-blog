import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username:"",
        email:"",
        phone:"",
    });

    const navigate = useNavigate();
    const params = useParams();
    const { authorizationToken } = useAuth();

    //get single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/users/${params.id}`, {
                method: "GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });
    
            const data = await response.json(); //we will get the data from response from backend,
            // then setData will set 'data' to new data
            console.log(`user single data: ${data}`);
            setData(data);

            // if(!response.ok){
            //     console.log("response not ok!");
            // }
        } catch (error) {
            console.log(`getsingleuserdata error: ${error}`);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    //to update the data dynamically
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/users/update/${params.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });

            if(response.ok){
                toast.success("Updated successfully :)");
                navigate("/admin/users");
            }
            else{
                toast.error("User not updated!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (<>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update user's data</h1>
            </ div>

            <div className="container grid grid-two-cols">
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                required
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input 
                                type="email" 
                                name="email"
                                id="email" 
                                required
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">phone</label>
                            <input 
                                type="phone" 
                                name="phone"
                                id="phone" 
                                required
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <button type="submit">Update</button>
                        </div>

                    </form>
                </section>
            </div>
        </section>
    </>);
};