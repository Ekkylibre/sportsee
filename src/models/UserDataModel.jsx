/**
 * Modèle de base des données utilisateur.
 */
class UserData {
    constructor(userData) {
        this.firstName = userData.userInfos.firstName;
        this.lastName = userData.userInfos.lastName;
        this.age = userData.userInfos.age;
        this.score = userData.todayScore ?? userData.score;
        this.keyData = userData.keyData;
    }
}

/**
 * Modèle de l'activité de l'utilisateur.
 */
class UserActivity {
    constructor(userActivity) {
        this.sessions = userActivity.sessions;
    }
}

/**
 * Modèle des sessions moyennes de l'utilisateur.
 */
class UserAverageSessions {
    constructor(userAverageSessions) {
        this.sessions = userAverageSessions.sessions;
    }
}

/**
 * Modèle des performances de l'utilisateur.
 */
class UserPerformance {
    constructor(userPerformance) {
        this.data = userPerformance.data.map(item => ({
            ...item,
            kind: userPerformance.kind[item.kind]
        }));
    }
}

export { UserData, UserActivity, UserAverageSessions, UserPerformance };
