import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Root = () => {
    return (
        <div className="w-[80%] mx-auto ">
            <Navbar></Navbar>
           
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;