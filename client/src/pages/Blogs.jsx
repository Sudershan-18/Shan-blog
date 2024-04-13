import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { format } from "date-fns";
import { useEffect } from "react";

export const Blogs = () => {
    const { blogs, getBlogs } = useAuth();
    
    useEffect(() => {
        getBlogs();
    }, []);
    
    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Blogs</h1>
            </div>

            <div className="container grid grid-three-cols">
                { blogs.length > 0 ? ( 
                    blogs.map((curElem, index) => {
                        //this is destructuring otherwise, we need to write curElem.price,...
                        // const {description, price, provider, service} = curElem;
                        const {_id, title, summary, cover, content, createdAt, author} = curElem;
                        
                        //whenever we use map we need to use a index variable and pass it in the below line
                        return (
                            <div className="card" key={index}>
                                <NavLink className="custom-link" to={`/blog/${_id}`}>
                                    <div className="card-img">
                                        <img 
                                            src={cover.url} 
                                            alt="blog image" 
                                            width="200"
                                        />
                                    </div>

                                    <div className="card-details">
                                        <div className="grid grid-two-cols">
                                            <p>
                                                By @<span style={{color: '#FFEA00', fontWeight: 'bold'}}>
                                                        {author.username}
                                                </span>
                                            </p>
                                            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                                        </div>
                                        <h2>{title}</h2>
                                        <p>{summary}</p>
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <h1>No blogs available</h1>
                    </>
                )}
            </div>
        </section>
    );
};