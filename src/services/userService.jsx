import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../assets/data/data';
import UserDataModel from '../models/UserDataModel';

const fetchUserData = (userId) => {
    const userIdInt = parseInt(userId);
    const userData = USER_MAIN_DATA.find(user => user.id === userIdInt);
    if (!userData) {
        throw new Error('User not found');
    }

    const userActivity = USER_ACTIVITY.find(activity => activity.userId === userIdInt);
    const userAverageSessions = USER_AVERAGE_SESSIONS.find(session => session.userId === userIdInt);
    const userPerformance = USER_PERFORMANCE.find(performance => performance.userId === userIdInt);

    if (!userActivity || !userAverageSessions || !userPerformance) {
        throw new Error('Related data not found');
    }

    const formattedUserData = new UserDataModel(userData, userActivity, userAverageSessions, userPerformance);

    return formattedUserData;
}

export default fetchUserData;
