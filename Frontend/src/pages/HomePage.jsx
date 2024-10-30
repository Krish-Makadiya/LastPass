import React from "react";
import img from "../assets/home.png";

const HomePage = () => {
    return (
        <div className="flex flex-col h-[80%] justify-center items-center">
            <img src={img} alt="" height={600} width={600} />
            <p className="text-[20px] text-center lg:w-[100%] w-[90%]">
                Please <span className="text-[#00ED64] font-[600]">log in</span>{" "}
                or <span className="text-[#00ED64] font-[600]">sign up</span> to
                start securely managing your passwords.
            </p>
        </div>
    );
};

export default HomePage;
