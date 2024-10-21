
export const signupHandler = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate
) => {
    return async () => {
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            })
            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            console.log("Signup successful");
            navigate("/");
        } catch (error) {
            console.log("signup failed", error);
        }
    };
};
