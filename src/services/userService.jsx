import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/data/data';
import UserDataModel from '../models/UserDataModel';

const fetchUserData = (userId) => {
    // Vérifier si userId est un nombre
    if (isNaN(userId)) {
        throw new Error('Error: Invalid userId');
    }

    const findData = (dataArray, key) => dataArray.find(item => item[key] == userId) || {};

    const userData = findData(USER_MAIN_DATA, 'id');
    const userActivity = findData(USER_ACTIVITY, 'userId');
    const userAverageSessions = findData(USER_AVERAGE_SESSIONS, 'userId');
    const userPerformance = findData(USER_PERFORMANCE, 'userId');

    if (!userData.id) {
        throw new Error('User not found');
    }

    return new UserDataModel(userData, userActivity, userAverageSessions, userPerformance);
}

export default fetchUserData;
