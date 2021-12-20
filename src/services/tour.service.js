import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/v1";
const getTours = async () => {
    // try {
    const { data: tours } = await axios.get(API_URL + "/tours");
    return tours.data.documents;
    // } catch (error) {
    //     console.log(error);
    //     Promise.reject(error)
    // }
};

const getTour = async (tourId) => {
    try {
        const { data: tour } = await axios.get(API_URL + `/tours/${tourId}`);
        return tour.data.document;
    } catch (error) {
        console.log(error);
        await Promise.reject(error);
    }
};

const deleteTour = async (tourId) => {
    try {
        const { data: tour } = await axios.delete(API_URL + `/tours/${tourId}`, {
            headers: { ...authHeader() },
        });
        return tour;
    } catch (error) {
        console.log(error);
        await Promise.reject(error);
    }
};

const addTour = async (tourInfo) => {
    const { data: tour } = await axios.post(API_URL + `/tours`, tourInfo, {
        headers: { "Content-Type": `multipart/form-data;` },
    });
    return tour;
};

const updateTour = async (tourId, tourInfo) => {
    const { data: tour } = await axios.patch(API_URL + `/tours/${tourId}`, tourInfo, {
        headers: { "Content-Type": `multipart/form-data;`, ...authHeader() },
    });
    return tour;
};

export default { getTours, getTour, addTour, updateTour, deleteTour };
