//React router dom from github repo, documentary?
//Componenet?
//IMPORTANT: read react documentary?
//spread operator (...)?
//promise?
//props drilling?
//useContext, context api?
//useEffect?
//useState?
//useReducer?
//table <table> in HTML?
//params from react-router-dom?
//json?
//diffrence in NavLink and Navigate

//if we export directly then we need to use {} i.e. treat them like an object
//if we export default eg. export default App; we dont have to use {}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Blogs } from "./pages/Blogs";
import { BlogPage } from "./pages/BlogPage";
import { EditBlogPage } from "./pages/EditBlogPage";
import { DeleteBlogPage } from "./pages/DeleteBlogPage";
import { CreateBlog } from "./pages/CreateBlog";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layouts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

//<BrowserRouter> stores the current location in the browser's address bar
//<Routes /> is gonna contain all the route(s) inside it.
const App = () => {
  return(
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/contact" element = {<Contact />} />
        {/* <Route path="/service" element = {<Service />} /> */}
        <Route path="/blogs" element = {<Blogs />} />
        <Route path="/blog/:id" element = {<BlogPage />} />
        <Route path="/blog/:id/edit" element = {<EditBlogPage />} />
        <Route path="/blog/:id/delete" element = {<DeleteBlogPage />} />
        <Route path="/create" element = {<CreateBlog />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/logout" element = {<Logout />} />

        {/* '*' in the below line is Wildcard, if the user tries to navigate some other route besides the above mentioned route then send him to error page */}
        <Route path="*" element = {<Error />} />

        {/* this is nested routes, and when we use nested routes we have to use 'outlet' otherwise the child will show properties of parents only and not their own properties */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
  );
};

export default App;