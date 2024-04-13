import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {

    const { LogoutUser } = useAuth();

    let flag = true;

    useEffect(() => {
        LogoutUser();
        if(flag){
            toast.warn("Logged Out!");
            flag = false;
        }
    }, [LogoutUser]);

    return <Navigate to="/login" />;
};