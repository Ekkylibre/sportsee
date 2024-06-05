import axios from 'axios';
import UserDataModel from '../models/UserDataModel';
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from '../assets/data/data';

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

/**
 * Récupère les données de l'utilisateur en utilisant les données mock.
 *
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {UserDataModel|null} Les données de l'utilisateur sous forme de modèle, ou null si l'utilisateur n'existe pas.
 */
const fetchUserDataMock = (userId) => {
    // Recherche de l'utilisateur dans les données mock USER_MAIN_DATA
    const userData = USER_MAIN_DATA.find(user => user.id === userId);

    // Si l'utilisateur n'existe pas, retourner null
    if (!userData) {
        return null;
    }

    // Recherche des activités de l'utilisateur dans les données mock USER_ACTIVITY
    const userActivity = USER_ACTIVITY.find(activity => activity.userId === userId);

    // Recherche des sessions moyennes de l'utilisateur dans les données mock USER_AVERAGE_SESSIONS
    const userAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);

    // Recherche des performances de l'utilisateur dans les données mock USER_PERFORMANCE
    const userPerformance = USER_PERFORMANCE.find(performance => performance.userId === userId);

    // Création et retour du modèle de données utilisateur
    return new UserDataModel(userData, userActivity, userAverageSessions, userPerformance);
};

export { fetchUserData, fetchUserDataMock };
