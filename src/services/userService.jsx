import axios from 'axios';
import UserDataModel from '../models/UserDataModel';

const API_BASE_URL = 'http://localhost:3000';

/**
 * Récupère les données de l'utilisateur à partir de l'API.
 *
 * @async
 * @function
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<UserDataModel>} Les données de l'utilisateur sous forme de modèle.
 * @throws {Error} Lance une erreur si l'identifiant de l'utilisateur est invalide ou si une erreur se produit lors de la récupération des données.
 */
const fetchUserData = async (userId) => {
    if (isNaN(userId)) {
        throw new Error("L'identifiant de l'utilisateur est invalide. Veuillez fournir un identifiant valide et réessayer.");
    }

    try {
        const userDataResponse = await axios.get(`${API_BASE_URL}/user/${userId}`);
        const userActivityResponse = await axios.get(`${API_BASE_URL}/user/${userId}/activity`);
        const userAverageSessionsResponse = await axios.get(`${API_BASE_URL}/user/${userId}/average-sessions`);
        const userPerformanceResponse = await axios.get(`${API_BASE_URL}/user/${userId}/performance`);

        const userData = userDataResponse.data.data;
        const userActivity = userActivityResponse.data.data;
        const userAverageSessions = userAverageSessionsResponse.data.data;
        const userPerformance = userPerformanceResponse.data.data;

        return new UserDataModel(userData, userActivity, userAverageSessions, userPerformance);
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Une erreur s'est produite lors de la récupération des données de l'utilisateur. Veuillez réessayer plus tard.");
    }
};

export { fetchUserData };
