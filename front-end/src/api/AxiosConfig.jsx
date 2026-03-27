// import axios from "axios";
// const instance = axios.create({
//   baseURL: "http://localhost:3000/",
// });
// instance.defaults.withCredentials = true;
// export default instance;

//commented code for accesing the deployed backend server, uncomment the below code and comment the above code to access the deployed backend server
import axios from "axios";

const instance = axios.create({
  baseURL: "https://products-website-io.onrender.com",
});
instance.defaults.withCredentials = true;
export default instance;
