import axios from 'axios';
import { UserData, UserActivity, UserAverageSessions, UserPerformance } from '../models/UserDataModel';

const API_BASE_URL = 'http://localhost:3000';

/**
 * Récupère les données de l'utilisateur à partir de l'API.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<UserData>} Les données de l'utilisateur.
 * @throws {Error} Si l'identifiant de l'utilisateur est invalide ou s'il y a une erreur lors de la récupération des données.
 */
const fetchUserData = async (userId) => {
    if (isNaN(userId)) {
        throw new Error("L'identifiant de l'utilisateur est invalide. Veuillez fournir un identifiant valide et réessayer.");
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return new UserData(response.data.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Une erreur s'est produite lors de la récupération des données de l'utilisateur. Veuillez réessayer plus tard.");
    }
};

/**
 * Récupère l'activité de l'utilisateur à partir de l'API.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<UserActivity>} L'activité de l'utilisateur.
 * @throws {Error} Si l'identifiant de l'utilisateur est invalide ou s'il y a une erreur lors de la récupération de l'activité.
 */
const fetchUserActivity = async (userId) => {
    if (isNaN(userId)) {
        throw new Error("L'identifiant de l'utilisateur est invalide. Veuillez fournir un identifiant valide et réessayer.");
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}/activity`);
        return new UserActivity(response.data.data);
    } catch (error) {
        console.error("Error fetching user activity:", error);
        throw new Error("Une erreur s'est produite lors de la récupération des activités de l'utilisateur. Veuillez réessayer plus tard.");
    }
};

/**
 * Récupère les sessions moyennes de l'utilisateur à partir de l'API.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<UserAverageSessions>} Les sessions moyennes de l'utilisateur.
 * @throws {Error} Si l'identifiant de l'utilisateur est invalide ou s'il y a une erreur lors de la récupération des sessions moyennes.
 */
const fetchUserAverageSessions = async (userId) => {
    if (isNaN(userId)) {
        throw new Error("L'identifiant de l'utilisateur est invalide. Veuillez fournir un identifiant valide et réessayer.");
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}/average-sessions`);
        return new UserAverageSessions(response.data.data);
    } catch (error) {
        console.error("Error fetching user average sessions:", error);
        throw new Error("Une erreur s'est produite lors de la récupération des sessions moyennes de l'utilisateur. Veuillez réessayer plus tard.");
    }
};

/**
 * Récupère les performances de l'utilisateur à partir de l'API.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<UserPerformance>} Les performances de l'utilisateur.
 * @throws {Error} Si l'identifiant de l'utilisateur est invalide ou s'il y a une erreur lors de la récupération des performances.
 */
const fetchUserPerformance = async (userId) => {
    if (isNaN(userId)) {
        throw new Error("L'identifiant de l'utilisateur est invalide. Veuillez fournir un identifiant valide et réessayer.");
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}/performance`);
        return new UserPerformance(response.data.data);
    } catch (error) {
        console.error("Error fetching user performance:", error);
        throw new Error("Une erreur s'est produite lors de la récupération des performances de l'utilisateur. Veuillez réessayer plus tard.");
    }
};

export { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance };
