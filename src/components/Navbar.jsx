import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../slices/UserSlice";
import { setToken, setLoading } from "../slices/UserSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(setLoading(true));
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
                        } lg:text-3xl text-xl font-[600]`}>
                        Logo.
                    </h1>
                </Link>

                <div className="flex lg:gap-20 gap-8 items-center">
                    <div className="flex gap-5">
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
                                <p className="lg:text-[18px] text-[14px] text-black">
                                    Star
                                </p>
                            </a>
                        </button>
                    </div>
                    <div
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } flex gap-4 lg:gap-6 items-center`}>
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
                                onClick={logoutHandler}>
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
                                <IoSettingsSharp className="lg:size-[30px] size-[25px]" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
