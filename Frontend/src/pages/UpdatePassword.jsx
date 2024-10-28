import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { setPasswordUpdated } from "../slices/UserSlice";
import Done from "../components/Done";
import { user } from "../apiConnection/apis";

const { RESET_PASSWORD_API } = user;

const UpdatePassword = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user.token);
    const darkMode = useSelector((state) => state.user.darkMode);
    const loading = useSelector((state) => state.user.loading);
    const passwordUpdated = useSelector((state) => state.user.passwordUpdated);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const [data, setData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    const { newPassword, confirmNewPassword } = data;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                RESET_PASSWORD_API,
                {
                    password: newPassword,
                    confirmPassword: confirmNewPassword,
                    token: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message);
            setData({ newPassword: "", confirmNewPassword: "" });
            dispatch(setPasswordUpdated(!passwordUpdated));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error verifying email:", error);
        }
    };

    return loading ? (
        <Loader />
    ) : passwordUpdated ? (
        <Done />
    ) : (
        <div className={`${darkMode ? "text-white" : "text-black"} w-screen`}>
            <div className="flex h-[80vh] flex-col justify-center lg:w-[25%] w-[80%] mx-auto  gap-5">
                <div className="flex flex-col">
                    <p className="text-[28px] font-[600] text-[#00ED64]">
                        Change Password
                    </p>
                    <p>Elevate your protection: New password, confirmed!</p>
                </div>
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            className={`text-black px-3 py-[6px] rounded-md text-[16px] border-4 ${
                                darkMode ? "" : "border-[#00ED64]"
                            }`}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmNewPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            className={`text-black px-3 py-[6px] rounded-md text-[16px] border-4 ${
                                darkMode ? "" : "border-[#00ED64]"
                            }`}
                        />
                    </div>
                    <button
                        className="bg-[#00ED64] px-3 py-2 rounded-md font-[600] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-95 mt-1"
                        type="submit">
                        <p className="text-black">Change Password</p>
                        <FaArrowRight color="black" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
