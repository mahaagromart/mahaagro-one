const { setAuthToken } = require("@/api/auth");
import { createSlice } from "@reduxjs/toolkit";

const intiState = () => {
    if(typeof window !== "undefined"){
        return {
            isAuthenicated: localStorage.getItem("userId") ? true : false,
            userId: localStorage.getItem("userId") || "",
            firstName: localStorage.getItem("firstName") || "",
            lastName: localStorage.getItem("lastName") || "",
            designationId: localStorage.getItem("designationId") || "",
            designationName: localStorage.getItem("designationName") || "",
        };
    }
    return{
        isAuthenicated: false,
        designationName: "",
        designationId: "",
        userId: "",
        firstName: "",
        lastName: "",
    }
}

const initialState = intiState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            //isAuthenticated
            const { userId, firstName, lastName, designationId, designationName,accessToken } = action.payload;
            state.isAuthenicated = true;
            state.userId = userId;
            state.firstName = firstName;
            state.lastName = lastName;
            state.designationId = designationId;
            state.designationName = designationName;
            localStorage.setItem("userId", userId);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("designationId", designationId);
            localStorage.setItem("designationName", designationName);
            setAuthToken(accessToken);
        },
        logout: (state) => {
            state.userId = "";
            state.firstName = "";
            state.lastName = "";
            state.designationId = "";
            state.designationName = "";
            localStorage.removeItem("userId");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("designationId");
            localStorage.removeItem("designationName");
            clearAuthToken();
        },
    },
}); 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

