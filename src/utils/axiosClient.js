import axios from "axios"



const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});



export default axiosClient;


/* 

so yeh basically ek axiosClient create kar raha hai 
agar hum iss axios client ko use karein toh humesha jo hai request jo hai woh humesha basURL ko hit karegi
matlab agar hum hit kare axiosClient.get("/getprofile") toh ye iss request ko automatically http://localhost:3000/getProfile bana degi

withCredentials: true ka matlab hai ki jab bhi request jaye server ko tab uske saath saath cookie bhi jaye request mein embedded hoke

*/