import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { setToken } from "../slices/UserSlice";
import { user } from "../apiConnection/apis";

const { RESET_PASSWORD_TOKEN_API } = user;

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const token = useSelector((state) => state.user.token);
    const darkMode = useSelector((state) => state.user.darkMode);
    const loading = useSelector((state) => state.user.loading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setEmail("");
            const response = await axios.post(
                RESET_PASSWORD_TOKEN_API,
                { email: email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Email sent. Check your inbox.");

            dispatch(setToken(null));
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error verifying email:", error);
        }
    };

    return (
        <div className={`w-full h-[89%]`}>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex h-[80vh] flex-col justify-center lg:w-[25%] w-[80%] mx-auto  gap-5">
                    <div className="flex flex-col">
                        <p className="text-[28px] font-[600] text-[#00ED64]">
                            Verify Email
                        </p>
                        <p>
                            Boost your security with a fresh, <br /> strong
                            password!
                        </p>
                    </div>
                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                className={`text-black bg-gray-100 w-full px-3 py-[6px] rounded-md text-[16px] border-[3px] ${
                                    !darkMode && "border-gray-300"
                                }`}
                                value={email}
                            />
                        </div>
                        <button
                            className="bg-[#00ED64] px-3 py-2 rounded-md font-[600] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-95 mt-1"
                            type="submit">
                            <p className="text-black">Verify Email</p>
                            <FaArrowRight color="black" />
                        </button>
                        <Link
                            to={token ? "/settings" : "/login"}
                            className={`flex gap-2 items-center`}>
                            <FaArrowLeft size={18} />
                            <p className="text-[16px] select-none">Back</p>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
