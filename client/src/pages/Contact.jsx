// import { useState, useEffect } from "react";
// import { useAuth } from "../store/auth";
// import { BACKEND_URL } from "../App";
// import { toast } from "react-toastify";

// export const Contact = () => {
//     const [contact, setContact] = useState({
//         username:"",
//         email:"",
//         message:"",
//     });

//     const { user, useAuthentication, isLoggedIn } = useAuth();
//     const [userData, setUserData] = useState(true);

//     if(userData && user){ //the logic here is that, when the page reloads this userData is true and
//         // once we get the user's data from auth.jsx, i.e. when user will login, this logic will 
//         // set the username, email to the corresponding user's username and email
//         // then the userData will become false, easy :)
//         //this is done to stop the re-rendering again and again
//         //whenever state/context/props changes or force update, then these re-rendering occurs
//         //so it is important to set the userData to false.
//         setContact({
//             username: user.username,
//             email: user.email,
//             message: "",
//         });

//         setUserData(false);
//     }

//     //another way of implementing the above logic, is simply useEffect :)
//     // useEffect(() => {
//     //     if (user) {
//     //         setContact({
//     //             username: user.username,
//     //             email: user.email,
//     //             message: "",
//     //         });
//     //     }
//     //     useAuthentication();
//     // }, [user]);

//     // useEffect(() => {
//     //     if (user) {
//     //         setContact({
//     //             username: user.username,
//     //             email: user.email,
//     //             message: "",
//     //         });
//     //     }
//     //     useAuthentication();
//     // }, [user]);

    

//     const handleInput = (e) => {
//         console.log(e);
//         let name = e.target.name;
//         let value = e.target.value;
//         setContact({
//             ...contact,
//             [name]: value,
//         });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(contact);

//         try {
//             const response = await fetch(`${BACKEND_URL}/api/form/contact`, {
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json",
//                 },
//                 body: JSON.stringify(contact),
//             });
//             console.log("contact response", response);

//             if(response.ok){
//                 setContact({
//                     username:user.username,
//                     email:user.email,
//                     message:"",
//                 });
//                 toast.success("Message sent successfully :)");
//             }
//             else{
//                 toast.error("Message not sent!")
//             }
//         } catch (error) {
//             console.log("message error!", error);
//         }
//     }

//     return <>
//         <section className="section-contact">
//             <div className="contact-content container">
//                 <h1 className="main-heading">Contact Me</h1>
//             </ div>

//             {/* contact page main */}
//             <div className="container grid grid-two-cols">
//                 <div className="contact-image">
//                     <img 
//                         src="/images/support.png" 
//                         alt="Contact image"
//                         width="500"
//                         height="500"
//                     />
//                 </div>

//                 {/* contact form actual content*/}
//                 <section className="section-form">
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="username">username</label>
//                             <input 
//                                 type="text" 
//                                 name="username" 
//                                 id="username" 
//                                 required
//                                 autoComplete="off"
//                                 value={isLoggedIn ? contact.username : ""}
//                                 onChange={handleInput}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="email">email</label>
//                             <input 
//                                 type="email" 
//                                 name="email"
//                                 id="email" 
//                                 required
//                                 autoComplete="off"
//                                 value={isLoggedIn ? contact.email : ""}
//                                 onChange={handleInput}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="message">message</label>
//                             <textarea 
//                                 name="message"
//                                 id="message"
//                                 autoComplete="off"
//                                 value={isLoggedIn ? contact.message : ""}
//                                 onChange={handleInput}
//                                 required
//                                 cols="30"
//                                 rows="6"
//                             ></textarea>
//                         </div>

//                         <div>
//                             <button type="submit">Submit</button>
//                         </div>

//                     </form>
//                 </section>
//             </div>

//             <section className="mb-3">
//             <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.372818480222!2d77.2352988753339!3d28.58859037568867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce33e29b04abf%3A0x29aa63e534930ea6!2sRAW%20Headquater%20In%20India!5e0!3m2!1sen!2sin!4v1712577462591!5m2!1sen!2sin" 
//                 width="100%" 
//                 height="450" 
//                 allowFullScreen
//                 loading="lazy" 
//                 referrerpolicy="no-referrer-when-downgrade"
//             ></iframe>
//             </section>
//         </section>
//     </>
// };

import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const { user, isLoggedIn } = useAuth();

    // Update contact details when user logs in
    useEffect(() => {
        if (isLoggedIn && user) {
            setContact({
                username: user.username,
                email: user.email,
                message: "",
            });
        }
    }, [isLoggedIn, user]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            console.log("contact response", response);

            if (response.ok) {
                setContact({
                    ...contact,
                    message: "",
                });
                toast.success("Message sent successfully :)");
            } else {
                toast.error("Message not sent!");
            }
        } catch (error) {
            console.log("message error!", error);
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact Me</h1>
            </div>

            <div className="container grid grid-two-cols">
                <div className="contact-image">
                    <img
                        src="/images/support.png"
                        alt="Contact image"
                        width="500"
                        height="500"
                    />
                </div>

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
                                value={contact.username}
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
                                value={contact.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="message">message</label>
                            <textarea
                                name="message"
                                id="message"
                                autoComplete="off"
                                value={contact.message}
                                onChange={handleInput}
                                required
                                cols="30"
                                rows="6"
                            ></textarea>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    );
};
