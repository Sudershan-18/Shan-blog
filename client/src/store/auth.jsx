//In React, the "context" is a feature that allows you to share state data between components without explicitly passing the data through each level of the component tree.
//It's a way to manage global state or share data between components that are not directly connected.

import { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../App"

export const AuthContext = createContext();

//The Provider component is resposible for "providing" the data(context) to its descendants.
//The value props of the Provider is crucial because it's where you define the data that you want to make accessible to comoponents that consume the context.
//this AuthProvider will wrap the App in main.jsx, which means that we can use all the function defined inside AuthProvider anywhere in the component tree we want to.
export const AuthProvider = ({ children }) => {

    //getting the token from the local storage
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);   //true value means that the data is still loading please dont move on and show the content
    // const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    //here we are gonna define the storetokenInLS() function
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !!token;
    // if(isLoggedIn){
    //     setUser()
    // }
    //if token is present then TRUE else FALSE
    console.log("isLoggedIn", isLoggedIn);

    //coding the logout functionality
    const LogoutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem("token");
    };

    const useAuthentication = async () => {
        if(isLoggedIn){
            try {
                setIsLoading(true);
                const response = await fetch(`${BACKEND_URL}/api/auth/user`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
    
                if(response.ok){
                    const data = await response.json();
                    console.log("user's data", data.userData);
                    setUser(data.userData);
                    setIsLoading(false); //once we get the data, set isLoading to false, cuz we have the data now and we can decide to show the content or not
                }
                else {
                    console.error("Error fetching user's data!");
                    setIsLoading(false); //since we are getting any kind of response, loading is finished, so set the isLoading variable to false
                }
            } catch (error) {
                console.error("Error fetching user's data!");
            }
        }
    };

    //to fetch data from the database
    // const getServices = async () => {
    //     try {
    //         const response = await fetch(`${BACKEND_URL}/api/data/service`, {
    //             method:"GET",
    //         });

    //         if(response.ok){
    //             const data = await response.json();
    //             console.log(data.msg);
    //             setServices(data.msg);
    //         }
    //     } catch (error) {
    //         console.log(`services frontend error: ${error}`);
    //     }
    // };

    //to fetch data of all blogs from the database
    const getBlogs = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/blogs`, {
                method:"GET",
            });

            if(response.ok){
                const data = await response.json();
                console.log(data.msg);
                setBlogs(data.msg);
            }
        } catch (error) {
            console.log(`blogs frontend error: ${error}`);
        }
    };

    //JWT Authentication -  to get the currently logged in user data
    useEffect(() => {
        // getServices();
        getBlogs();
        // const fetchData = async () => {
        //     await useAuthentication();
        // };
        // fetchData();
        useAuthentication();
    }, []);

    //this value={} is props
    //pass the functions in props so that any child can access it :)
    return <AuthContext.Provider value={ { 
            isLoggedIn, 
            storeTokenInLS, 
            LogoutUser, 
            user, 
            // services, 
            blogs,
            authorizationToken, 
            isLoading, 
            useAuthentication,
            getBlogs,
        } }>
        { children }
        {/* {user !== undefined ? children : null} */}
    </AuthContext.Provider>
};

//useAuth function now contains the value provided by the AuthContext.Provider higher up in the component tree.
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){  //this is to make sure that we don't forget to wrap the App in main.jsx
        //this line will throw error if we forgot to wrap
        throw new Error("useAuth used outside of the Provider!");
    }

    return authContextValue;
};