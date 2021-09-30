import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/v1";
const getReviews = async () => {
    try {
        const { data: reviews } = await axios.get(API_URL + "/reviews", { headers: authHeader() });
        return reviews.data.documents;
    } catch (error) {
        console.log(error);
    }
};

const updateReview = async (payload) => {
    try {
        const reviewId = payload.id;

        const { data: review } = await axios.patch(
            API_URL + "/reviews/" + reviewId,
            { review: payload.review, rating: parseInt(payload.rating) },
            { headers: authHeader() }
        );
        return review;
    } catch (error) {
        console.log(error);
    }
};

export default { getReviews, updateReview };
