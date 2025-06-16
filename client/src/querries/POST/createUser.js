import axios from "axios";
import { BASE_URL } from "../../config";

const createUser = async ({email, username, password}) => {
    try{
        const url = `${BASE_URL}/api/users`;
        if (!email || !password || !username) {
            throw new Error("Missing required post fields");
        }
        const data = {email, password, username}
        const response = await axios.post(
            url,
            data
        );
        console.log("User created: ",response.data);
        return response.data;
    } 
    catch(error){
        console.error(error.response?.data?.error || error.message);
        throw new Error(error.response?.data?.error || "Something went wrong");
    }
};

export default createUser;