// import axios from "axios";

// // Set the base URL for Axios
// // const api = axios.create({
// //     baseURL: process.env.REACT_APP_API_URL,
// // });

// // Automatically attach the authorization token
// // api.interceptors.request.use((config) => {
// //     const token = localStorage.getItem("adminToken");
// //     if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// // });

// // Fetch all passengers
// export const getPassengers = async () => {
//     try {
//         const response = await axios.get("http://localhost:7676/api/admin/passengers");
//         console.log("Fetched Passengers:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching passengers:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };


// // Fetch all trains
// export const getTrains = async () => {
//     try {
//         const response = await axios.get("http://localhost:7676/api/admin/trains");
//         console.log("Fetched Trains:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching trains:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };
