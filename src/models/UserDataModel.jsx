class UserDataModel {
    constructor(userData, userActivity, userAverageSessions, userPerformance) {
        this.id = userData.id;
        this.firstName = userData.userInfos.firstName;
        this.lastName = userData.userInfos.lastName;
        this.age = userData.userInfos.age;
        this.score = userData.todayScore ?? userData.score; // Normalisation du score
        this.keyData = userData.keyData;
        this.activity = userActivity.sessions;
        this.averageSessions = userAverageSessions.sessions;
        this.performance = userPerformance.data.map(item => ({
            ...item,
            kind: userPerformance.kind[item.kind]
        }));
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Ajoutez d'autres méthodes de transformation si nécessaire
}

export default UserDataModel;
