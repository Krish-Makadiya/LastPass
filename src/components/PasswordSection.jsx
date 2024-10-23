import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

const PasswordSection = ({ passwords, setData, setAllPasswords }) => {
    const darkMode = useSelector((state) => state.user.darkMode);
    const token = useSelector((state) => state.user.token);

    const toasthandler = () => {
        toast.success("Copied!!!");
    };

    const editHandler = async (passwordEdit) => {
        setData({
            linkName: passwordEdit.linkName,
            linkUrl: passwordEdit.linkUrl,
            username: passwordEdit.username,
            password: passwordEdit.password,
        });

        const updatedPasswords = passwords.filter(
            (password) => password._id !== passwordEdit._id
        );
        setAllPasswords(updatedPasswords);

        try {
            const response = await axios.delete(
                "http://localhost:4000/api/v1/delete-password",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        passwordId: passwordEdit._id,
                    },
                }
            );
            console.log(
                `API RESPONSE: ${JSON.stringify(response.data.data, null, 2)}`
            );
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Error deleting password", error);
        }
    };

    const deleteHandler = async (passwordToDelete) => {
        const updatedPasswords = passwords.filter(
            (password) => password._id !== passwordToDelete._id
        );
        setAllPasswords(updatedPasswords);

        try {
            const response = await axios.delete(
                "http://localhost:4000/api/v1/delete-password",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        passwordId: passwordToDelete._id,
                    },
                }
            );
            console.log(
                `API RESPONSE: ${JSON.stringify(response.data.data, null, 2)}`
            );
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
        } catch (error) {
            console.log("Error deleting password", error);
        }
    };

    return (
        <div className="lg:w-[60%] w-[90%] mx-auto lg:pb-12 pb-4 text-black">
            <h2
                className={`${
                    darkMode ? "text-white" : "text-black"
                } text-3xl font-semibold mb-6`}>
                Your Passwords
            </h2>

            {passwords.length === 0 && (
                <div
                    className={`text-center ${
                        darkMode ? "text-white" : "text-black"
                    }`}>
                    No passwords saved yet.
                </div>
            )}

            {passwords.map((password, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col bg-white px-5 py-4 rounded-md gap-3 mb-4 ${
                        !darkMode && "border-[1px] border-gray-300"
                    }`}>
                    <div className="flex justify-between">
                        <p className={"w-[20%] font-[600] text-[18px]"}>
                            {password.linkName}
                        </p>
                        <div className={"flex gap-3"}>
                            <MdEdit
                                size={24}
                                onClick={() => editHandler(password)}
                            />
                            <MdDelete
                                size={24}
                                onClick={() => deleteHandler(password)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="flex items-center w-[30%]  justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md">
                            <input
                                type="text"
                                value={password.linkUrl}
                                className="w-[90%] outline-none"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.linkUrl
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                        <div className="flex items-center w-[40%] justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md">
                            <input
                                type="text"
                                value={password.username}
                                className="w-[90%] outline-none"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.linkUrl
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                        <div className="flex items-center w-[30%] justify-between  border-[1px] border-gray-400 p-1 px-2 rounded-md">
                            <input
                                type="password"
                                value={password.password}
                                className="w-[90%] outline-none"
                                readOnly
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        password.linkUrl
                                    );
                                    toasthandler();
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PasswordSection;
