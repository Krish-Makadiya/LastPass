import React from "react";
import { Link } from "react-router-dom";
import { Player } from "@lordicon/react";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";

import ICON from "../assets/tickBright";

const Done = () => {
    const playerRef = useRef(null);

    useEffect(() => {
        playerRef.current.playFromBeginning();
    }, []);

    return (
        <div className="w-full h-[89vh]">
            <div className="flex flex-col items-center h-[80%] justify-center gap-3">
                <p className="text-[28px] font-[600] text-center">
                    Password Updated{" "}
                    <span className="text-[#00ED64]">Successfully!</span>
                </p>
                <Player ref={playerRef} size={200} icon={ICON} />
                <p className="text-center">
                    Your password has been <span className="text-[#00ED64]">Updated!</span> <br /> You can now use it to
                    access your accounts.
                </p>
                <Link to="/login" className="bg-[#00ED64] px-5 py-3 rounded-md font-[600] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-95 mt-1 text-black">
                    <p>Login Account</p>
                    <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Done;
