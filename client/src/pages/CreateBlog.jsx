import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { useNavigate, Navigate } from "react-router-dom";
import Editor from "../components/editor/Editor";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const CreateBlog = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, getBlogs } = useAuth();

    if(!isLoggedIn){
        return <Navigate to="/404" />
    }

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [author, setAuthor] = useState(user._id); // Assuming user._id is correctly set

    const createNewBlog = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);
        data.set("author", author); // Set author directly, assuming user._id is correctly set

        console.log(`title: ${title}`);
        console.log(`form data: ${data}`);
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/blog/create`, {
                method: "POST",
                body: data,
            });
            console.log(`create blog response: ${response.json()}`);

            if(response.ok){
                setTitle("");
                setSummary("");
                setContent("");
                setFiles('');
                toast.success("Blog created :)");

                getBlogs();
                navigate("/blogs");
            }
            else{
                toast.error("Blog not created!!");
            }
        } catch (error) {
            console.log("create blog error: ", error);
        }
    };

    return (
        <form onSubmit={e => createNewBlog(e)}>
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
                onChange={ev => setFiles(ev.target.files)}
            />
            <Editor value={content} onChange={setContent}/>
            <button type="submit">Create Blog</button>
        </form>
    );
};