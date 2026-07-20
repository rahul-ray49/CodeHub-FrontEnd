import axios from "axios"
//import store from "../store/store"
//import { logoutLocal } from "../authSlice";


const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {

        const authErrors = [
            "Token not found",
            "Invalid token",
            "Invalid or expired token",
            "Session expired. Logged in from another device.",
            "Token is blocked, userMiddleware",
        ];

        if (error.response?.status === 401 && authErrors.includes(error.response.data?.message)) {

            const message = error.response.data?.message;

             

                //store.dispatch(logoutLocal());

                // if (window.location.pathname !== "/login") {
                //     window.location.replace("/login");
                // }

            
        }

        return Promise.reject(error);
    }
);


export default axiosClient;


/* 

so yeh basically ek axiosClient create kar raha hai 
agar hum iss axios client ko use karein toh humesha jo hai request jo hai woh humesha basURL ko hit karegi
matlab agar hum hit kare axiosClient.get("/getprofile") toh ye iss request ko automatically http://localhost:3000/getProfile bana degi

withCredentials: true ka matlab hai ki jab bhi request jaye server ko tab uske saath saath cookie bhi jaye request mein embedded hoke

*/