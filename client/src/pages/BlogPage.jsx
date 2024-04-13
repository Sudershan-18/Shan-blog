import { useAuth } from "../store/auth";
import { BACKEND_URL } from "../App";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export const BlogPage = () => {
    const { user, isLoggedIn, getBlogs } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState({
        title:"",
        _id:"",
        content:"",
        cover:{
            url:"",
        },
        author:{
            username:"",
            _id:"",
        },
        createdAt:null,
    });

    useEffect(() => {
        const getSingleBlogData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/blog/${params.id}`, {
                    method: "GET",
                });
        
                if(response.ok){
                    const data = await response.json();
                    setBlog(data);
                }
                else {
                    console.log(`error fetching blog's data: ${response}`);
                }
            } catch (error) {
                console.log(`BlogPage error: ${error}`);
            }
        };

        getSingleBlogData();
    }, []);
    
    return(
        <div className="blog-page">
            <h1>{blog.title}</h1>

            <div className="time">{format(new Date(blog.createdAt), 'MMM d, yyyy HH:mm')}</div>
            <div className="author">By @{blog.author.username}</div>

            {user._id === blog.author._id && (
                <div className="edit-row">
                    <NavLink to={`/blog/${blog._id}/edit`}>
                        <button className="btn"><FaEdit /> Edit</button>
                    </NavLink>
                    <NavLink to={`/blog/${blog._id}/delete`}>
                        <button className="btn secondary-btn">
                            <MdDeleteOutline /> Delete
                        </button>
                    </NavLink>
                </div>
            )}

            <div className="image">
                <img src={blog.cover.url} alt="" />
            </div>
            
            <div className="content" dangerouslySetInnerHTML={{__html:blog.content}} />
        </div>
    );
};