import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../slices/UserSlice";
import { setToken, setLoading } from "../slices/UserSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { setIsDialogOpen } from "../slices/UserSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);

    const navigate = useNavigate();
    const [logoutDialog, setLogoutDialog] = useState(false);

    const logoutHandler = () => {
        dispatch(setLoading(true));
        setLogoutDialog(!logoutDialog);
        setTimeout(() => {
            dispatch(setToken(null));
            localStorage.removeItem("token");
            dispatch(setLoading(false));
            navigate("/login");
        }, 1000);
    };

    return (
        <div className={darkMode ? "bg-[#001E2B]" : "bg-[#FFFFFF]"}>
            <nav className="flex w-[90%] md:w-[80%] lg:w-9/12 h-[6vh] lg:h-[11vh] md:h-[8vh] mx-auto py-4 items-center justify-between">
                <Link to={"/"}>
                    <h1
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } lg:text-3xl text-[20px] font-[600]`}>
                        Last<span className="text-[#00ED64]">Pass.</span>
                    </h1>
                </Link>

                <div className="flex lg:gap-20 gap-6 items-center">
                    <div className="flex lg:gap-5 gap-3">
                        <button
                            className={`${
                                darkMode ? "text-white" : "text-black"
                            }  transition-all duration-200 hover:scale-95`}
                            onClick={() => dispatch(setDarkMode(!darkMode))}>
                            {darkMode ? (
                                <MdDarkMode className="lg:size-[30px] size-[25px]" />
                            ) : (
                                <MdLightMode className="lg:size-[30px] size-[25px]" />
                            )}
                        </button>
                        <button className="bg-[#00ED64] lg:px-3 lg:py-2 px-2 py-1 rounded-md  transition-all duration-200 hover:scale-95">
                            <a
                                href="https://github.com/Krish-Makadiya?tab=repositories"
                                className="flex items-center gap-2">
                                <IoLogoGithub
                                    className="lg:size-[30px] size-[25px]"
                                    color="black"
                                />
                                <p className="lg:text-[18px] text-[14px] text-black font-[600] hidden lg:block">
                                    GitHub
                                </p>
                            </a>
                        </button>
                    </div>
                    <div
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } flex gap-3 lg:gap-6 items-center`}>
                        {!token && (
                            <Link
                                to={"/login"}
                                className={`font-[600] lg:text-[18px] text-[14px] transition-all duration-200 hover:scale-95`}>
                                Login
                            </Link>
                        )}
                        {!token && (
                            <Link
                                to={"/signup"}
                                className={`text-black font-[600] lg:text-[18px] text-[14px]  bg-[#00ED64] lg:px-3 px-2 lg:py-2 py-1 rounded-md transition-all duration-200 hover:scale-95`}>
                                Sign Up
                            </Link>
                        )}
                        {token && (
                            <button
                                className="bg-[#00ED64] lg:px-3 px-2 lg:py-2 py-1 rounded-md font-[600] flex items-center lg:gap-2 gap-1 transition-all duration-200 hover:scale-95"
                                onClick={() => setLogoutDialog(!logoutDialog)}>
                                <p className="text-black lg:text-[18px] text-[14px]">
                                    Logout
                                </p>
                                <IoLogOut
                                    className="lg:size-[30px] size-[25px]"
                                    color="black"
                                />
                            </button>
                        )}
                        {token && (
                            <Link to={"/settings"}>
                                <IoSettingsSharp className="lg:size-[30px] size-[25px] transition-all duration-200 hover:scale-95" />
                            </Link>
                        )}
                        {logoutDialog && (
                            <div className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.50)]">
                                <div className="flex flex-col justify-center items-center w-full h-full">
                                    <div
                                        className={`px-6 py-4 lg:w-[500px] w-[90%] rounded-[10px] border-[2px] border-gray-600 flex flex-col gap-5 ${
                                            darkMode
                                                ? "bg-[rgba(0,0,0,0.9)]"
                                                : "bg-[rgba(255,255,255,0.9)]"
                                        }`}>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[20px] font-[600] text-[#00ED64]">
                                                Logout Account
                                            </p>
                                            <p
                                                className={`text-[14px] ${
                                                    darkMode
                                                        ? "text-white"
                                                        : "text-black"
                                                }`}>
                                                Are you sure you want to log
                                                out?
                                            </p>
                                        </div>

                                        <div className="flex justify-around">
                                            <button
                                                className={`transition-all duration-200 hover:scale-95 ${
                                                    darkMode
                                                        ? "text-white"
                                                        : "text-black"
                                                }`}
                                                onClick={() =>
                                                    setLogoutDialog(
                                                        !logoutDialog
                                                    )
                                                }>
                                                Cancel
                                            </button>

                                            <button
                                                className="bg-[#00ED64] lg:px-5 px-3 lg:py-2 py-2 rounded-md font-[600] flex items-center lg:gap-2 gap-1 transition-all duration-200 hover:scale-95 text-black"
                                                onClick={logoutHandler}>
                                                <p>Logout</p>
                                                <IoLogOut size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
