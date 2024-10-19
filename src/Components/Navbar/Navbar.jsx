import { NavLink } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Navbar = () => {

    const handleLogOut = () =>{
        logOut()
        .then(()=>{
           alert('User loged Out successfully') 
        })
        .catch(error =>{
            console.log(error)
        })
    }

    

    const {user, logOut} = useContext(AuthContext)

    // main navbar
    const links= <div className="text-rose-600 font-bold font-work flex gap-6">
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/register">Register</NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li>
    <li><NavLink to="/orders">Orders</NavLink></li>

{user && <>
  <li><NavLink to="/profile">Profile</NavLink></li>
  <li><NavLink to="/dash">Dashboard</NavLink></li>
</>}

    </div>


// responsive navbar
    const reslinks = <div className="text-rose-600 font-bold font-work">
       <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/register">Register</NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li> 
    <li><NavLink to="/orders">Orders</NavLink></li> 
    {user && <>
  <li><NavLink to="/profile">Profile</NavLink></li>
  <li><NavLink to="/dash">Dashboard</NavLink></li>
</>}
    </div>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
        {reslinks}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl uppercase font-work text-rose-600">Master Shape</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      
      {links}
      
    </ul>
  </div>
  <div className="navbar-end">
    {
        user ? <>
        <span className="flex items-center text-rose-900 font-work font-bold gap-2">
          <Link to="/profile"><FaRegUserCircle className="text-2xl"></FaRegUserCircle></Link>
          {user.email}
        </span>
        <a onClick={handleLogOut} className="btn btn-sm ml-4 bg-rose-400 font-work">Sign Out</a>
        </>
        : <Link to="/login"><button className="btn btn-sm bg-rose-400 font-work">Sign In</button></Link>
    }
    
  </div>
</div>
    );
};

export default Navbar;