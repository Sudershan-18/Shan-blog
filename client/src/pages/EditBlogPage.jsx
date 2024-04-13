import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";
import Editor from "../components/editor/Editor";

export const EditBlogPage = () => {
    const { user, isLoggedIn, getBlogs } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    if(!isLoggedIn){    //if user is not logged in then redirect to error page
        navigate("/404");
    }

    const [authorId, setAuthorId] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/blog/${params.id}`, {
                    method: "GET",
                });

                if(response.ok) {
                    const data = await response.json();
                    setAuthorId(data.author._id);
                    setTitle(data.title);
                    setSummary(data.summary);
                    setContent(data.content);
                } else {
                    console.log(`Error fetching blog data: ${response}`);
                }
            } catch (error) {
                console.log(`DeleteBlogPage error: ${error}`);
            }
        };

        fetchBlogData();
    }, []);

    if(authorId === null){ // Wait for authorId to be set, as when we click reload we are redirected to error page because the authorId is not set yet, it is asynchronous and takes some time
        return null;
    }

    console.log(authorId);

    if(user._id !== authorId){ //if user is not author then redirect to error page
        navigate("/404");
    }

    const editBlog = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        if(files?.[0]){
            data.set("file", files[0]);
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/blog/edit/${params.id}`, {
                method: "PATCH",
                body: data,
            });

            if (response.ok) {
                toast.success("Blog updated successfully.");
                getBlogs();
                navigate("/blogs");
            } else {
                toast.error("Blog not updated!");
            }
        } catch (error) {
            console.log("editBlog error: ", error);
        }
    };

    return (
        <form onSubmit={e => editBlog(e)}>
            <input 
                type="text"
                placeholder={"Title"}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input 
                type="text"
                placeholder={'Summary'}
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input 
                type="file" 
                onChange={e => setFiles(e.target.files)}
            />
            <Editor value={content} onChange={setContent}/>
            <button type="submit">Update Blog</button>
        </form>
    );
};