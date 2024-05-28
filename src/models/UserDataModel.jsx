/**
 * Modèle de données utilisateur.
 */
class UserDataModel {
    /**
     * Crée une instance de UserDataModel.
     * 
     * @param {Object} userData - Les données de base de l'utilisateur.
     * @param {Object} userActivity - L'activité de l'utilisateur.
     * @param {Object} userAverageSessions - Les sessions moyennes de l'utilisateur.
     * @param {Object} userPerformance - Les performances de l'utilisateur.
     */
    constructor(userData, userActivity, userAverageSessions, userPerformance) {
        /**
         * L'identifiant de l'utilisateur.
         * @type {number}
         */
        this.id = userData.id;

        /**
         * Le prénom de l'utilisateur.
         * @type {string}
         */
        this.firstName = userData.userInfos.firstName;

        /**
         * Le nom de famille de l'utilisateur.
         * @type {string}
         */
        this.lastName = userData.userInfos.lastName;

        /**
         * L'âge de l'utilisateur.
         * @type {number}
         */
        this.age = userData.userInfos.age;

        /**
         * Le score actuel de l'utilisateur.
         * @type {number}
         */
        this.score = userData.todayScore ?? userData.score; // Normalisation du score

        /**
         * Les données clés de l'utilisateur.
         * @type {Object}
         */
        this.keyData = userData.keyData;

        /**
         * Les sessions d'activité de l'utilisateur.
         * @type {Array}
         */
        this.activity = userActivity.sessions;

        /**
         * Les sessions moyennes de l'utilisateur.
         * @type {Array}
         */
        this.averageSessions = userAverageSessions.sessions;

        /**
         * Les performances de l'utilisateur, avec le type de performance normalisé.
         * @type {Array}
         */
        this.performance = userPerformance.data.map(item => ({
            ...item,
            kind: userPerformance.kind[item.kind]
        }));
    }
}

export default UserDataModel;
