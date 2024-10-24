import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Signup = () => {
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.user.darkMode);
    const loading = useSelector((state) => state.user.loading);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { firstName, lastName, email, password, confirmPassword } = data;

    const changeHandler = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            console.log("Hello");
            const response = await axios.post(
                "http://localhost:4000/api/v1/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                }
            );
            console.log(JSON.stringify(response));

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log("Signup successful");
            toast.success(response.data.message);
            navigate("/login");
        } catch (error) {
            console.log("signup failed", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={`w-full ${darkMode ? "bg-[#001E2B]" : "bg-[#FFFFFF]"}`}>
            {loading ? (
                <Loader/>
            ) : (
                <div
                    className={`h-[89vh] lg:w-[30%] md:w-[60%] w-[85%] mx-auto flex flex-col justify-center gap-6`}>
                    <h1
                        className={`text-[36px] font-[600] ${
                            darkMode ? "text-white" : "text-black"
                        }`}>
                        Your <span className="text-[#00ED64]">Privacy</span>{" "}
                        Starts <span className="text-[#00ED64]">Here.</span>
                    </h1>

                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-5">
                        <div className="flex w-full gap-4 justify-between">
                            <div className="flex flex-col gap-1 w-[48%]">
                                <label
                                    htmlFor="firstName"
                                    className={`text-[16px] ${
                                        darkMode ? "text-white" : "text-black"
                                    } select-none`}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={data.firstName}
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={changeHandler}
                                    className={`text-black bg-gray-100 w-[100%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-[48%]">
                                <label
                                    htmlFor="lastName"
                                    className={`text-[16px] ${
                                        darkMode ? "text-white" : "text-black"
                                    } select-none`}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={data.lastName}
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={changeHandler}
                                    className={`text-black bg-gray-100 w-[100%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                                className={`text-[16px] ${
                                    darkMode ? "text-white" : "text-black"
                                } select-none`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                name="email"
                                placeholder="Enter email address"
                                onChange={changeHandler}
                                className={`text-black bg-gray-100 w-[100%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className={`text-[16px] ${
                                    darkMode ? "text-white" : "text-black"
                                } select-none`}>
                                Password
                            </label>
                            <div className="flex items-center gap-3 w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    name="password"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                    className={`text-black bg-gray-100 w-[100%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                                />
                                <div
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <BiSolidHide
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    ) : (
                                        <BiSolidShow
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="confirmPassword"
                                className={`text-[16px] ${
                                    darkMode ? "text-white" : "text-black"
                                } select-none`}>
                                Confirm Password
                            </label>
                            <div className="flex items-center gap-3 w-full">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={data.confirmPassword}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={changeHandler}
                                    className={`text-black bg-gray-100 w-[100%] px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                                />
                                <div
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }>
                                    {showConfirmPassword ? (
                                        <BiSolidHide
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    ) : (
                                        <BiSolidShow
                                            fontSize={30}
                                            className={`${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-black"
                                            }`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 gap-5">
                            <button
                                type="submit"
                                className={`text-black font-[600] text-[18px] bg-[#00ED64] px-3 py-3 rounded-md flex items-center justify-center gap-3 select-none transition-all duration-200 hover:scale-95`}>
                                <p>Create Account</p>
                                <FaArrowRight size={22} />
                            </button>
                            <Link
                                to="/login"
                                className={`flex gap-3 items-center ${
                                    darkMode ? "text-white" : "text-black"
                                }`}>
                                <FaArrowLeft size={22} />
                                <p className="text-[16px] select-none">
                                    Already Have an Account
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Signup;
