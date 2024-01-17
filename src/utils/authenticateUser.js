import axios from "axios";
import { server } from "../main";

export const authenticateUser = async () => {
    const { data } = await axios.get(`${server}/user/userlogin`, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    });

    return data;
}
