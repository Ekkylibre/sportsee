import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/data/data';
import UserDataModel from '../models/UserDataModel';

const fetchUserData = (userId) => {
    const userData = USER_MAIN_DATA.find(user => user.id === parseInt(userId, 10));
    if (!userData) {
        throw new Error('User not found');
    }

    const userActivity = USER_ACTIVITY.find(activity => activity.userId === parseInt(userId, 10));
    const userAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === parseInt(userId, 10));
    const userPerformance = USER_PERFORMANCE.find(performance => performance.userId === parseInt(userId, 10));

    if (!userActivity || !userAverageSessions || !userPerformance) {
        throw new Error('Related data not found');
    }

    const formattedUserData = new UserDataModel(userData, userActivity, userAverageSessions, userPerformance);

    return formattedUserData;
}

export default fetchUserData;
