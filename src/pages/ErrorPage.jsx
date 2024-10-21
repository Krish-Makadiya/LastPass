import React from "react";
import img from "../assets/error.png";

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <img src={img} alt="" height={600} width={600} />
                <p className="text-[20px]">Oops! Page <span className="text-[#00ED64] font-[600]">not Found.</span></p>
            </div>
        </div>
    );
};

export default ErrorPage;
