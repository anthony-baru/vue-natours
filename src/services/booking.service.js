import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/api/v1";

const getCheckoutSession = async (tourId,successUrl,cancelUrl) => {
   
        const { data: result } = await axios.get(`${API_URL}/bookings/checkout-session/${tourId}?successUrl=${successUrl}&&cancelUrl=${cancelUrl}`, { headers: authHeader() });
        
        return result.session;
    
};

export default {
    getCheckoutSession
}