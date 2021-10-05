import axios from "axios";
import authHeader from "./auth-header";

const getUsers = async () => {
    try {
        const { data: users } = await axios.get("/users", { headers: authHeader() });
        return users.data.documents;
    } catch (error) {
        console.log(error);
    }
};

export default { getUsers };
