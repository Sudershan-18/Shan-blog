import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";

export const DeleteBlogPage = () => {
    const { user, isLoggedIn, getBlogs } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    if(!isLoggedIn){
        navigate("/404");
    }

    const [authorId, setAuthorId] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/blog/${params.id}`, {
                    method: "GET",
                });

                if(response.ok) {
                    const data = await response.json();
                    setAuthorId(data.author._id);
                    // console.log("authorId: ", authorId);
                    //the authorId is not set instantly it takes some time
                } else {
                    console.log(`Error fetching blog data: ${response}`);
                }
            } catch (error) {
                console.log(`DeleteBlogPage error: ${error}`);
            }
        };

        fetchBlogData();
    }, []);

    console.log(authorId);

    const deleteBlog = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/blog/delete/${params.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Blog deleted successfully.");
                getBlogs();
                navigate("/blogs");
            } else {
                toast.error("Blog not deleted!");
            }
        } catch (error) {
            console.log("deleteBlog error: ", error);
        }
    };

    if (user._id === authorId) {
        deleteBlog();
    } else {
        navigate("/404");
    }

    return null;
};