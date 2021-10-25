import axios from "axios";

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
        Promise.reject(error)
    }
};

const addTour = async (tourInfo) => {
    const { data: tour } = await axios.post(API_URL + `/tours`, tourInfo, {
        headers: { 'Content-Type': `multipart/form-data;` },
    });
    return tour.data.document;
};

export default { getTours, getTour, addTour };
