import React from "react";
import "./Loader.css";
import { useSelector } from "react-redux";

const Loader = () => {
    const darkMode = useSelector((state)=>state.user.darkMode)

    return (
        <div className={`h-[89vh] w-full flex justify-center items-center ${darkMode?"bg-[#001E2B]":"bg-white"}`}>
            <div className="loader "></div>
        </div>
    );
};

export default Loader;
