import Question from "./Question.js"
import SuggestedQuestion from "./SuggestedQuestion.js"
/*
import Account from "./Account.js"
import Account from "./"
*/
export default class DatabaseManager {

	/**
	 * @description get a Question from ID
	 * 
	 * @param {number} QID 
	 * 
	 * @return {Question}
	 * 
	 * @todo implement
	 */
	static getQuestion(QID) {

	}

	/**
	 * @description get a random Question
	 * NOTE: must not be a random Question
	 * 
	 * @return {Question}
	 * 
	 * @todo implement
	 */
	static getQuestion() {

	}

	/**
	 * @description search for questions that match parameters
	 * 
	 * @param {?} parameters 
	 * 
	 * @return {Question[]} Questions that match parameters
	 * 
	 * @todo parameters type
	 * @todo implement
	 */
	static searchQuestion(parameters) {

	}

	/**
	 * @description add a question to the database
	 * 
	 * @param {Question} question 
	 * 
	 * @return {number} QID for question or -1 on failure
	 * 
	 * @todo implement
	 */
	static addQuestion(question) {

	}
	
	/**
	 * @description get a statistic from Questions or QIDs
	 * 
	 * @param {Question[]|number[]} questions - list of questions to generate the statistic
	 * 
	 * @return {?} statistic
	 * 
	 * @todo return type
	 * @todo implement
	 */
	static getStatistic(questions) {

	}

	/**
	 * @description search for statistics that match parameters
	 * 
	 * @param {?} parameters 
	 * 
	 * @return {?} statistic[]
	 * 
	 * @todo parameters type
	 * @todo return type
	 * @todo implement
	 */
	static searchStatistic(parameters) {

	}

	/**
	 * @description add a question to the database
	 * 
	 * @param {Question} question 
	 * @param {number|string} answer 
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement
	 */
	static addQuestionAnswer(question, answer) {

	}

	/**
	 * @description get a suggested question that has ID QID
	 * 
	 * @param {number} QID 
	 * 
	 * @return {SuggestedQuestion}
	 * 
	 * @todo implement
	 */
	static getSuggestedQuestion(QID) {

	}

	/**
	 * @description get the first suggested question
	 * 
	 * @return {SuggestedQuestion}
	 * 
	 * @todo implement
	 */
	static popSuggestedQuestion() {

	}

	/**
	 * @description add a SuggestedQuestion to the database
	 * 
	 * @param {SuggestedQuestion} suggestedQuestion 
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement
	 */
	static addSuggestedQuestion(suggestedQuestion) {

	}

	/**
	 * @description remove a SuggestedQuestion from the database
	 * 
	 * @param {Question|number} question 
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement
	 */
	static removeSuggestedQuestion(question) {

	}

	/**
	 * @description add a suggested question to the pool of questions
	 * 
	 * @param {Question|number} question 
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo come up with a better name
	 * @todo implement
	 */
	static fullyAddSuggestedQuestion(question) {

	}

	/**
	 * @description add rating for a Question
	 * 
	 * @param {Question|number} question
	 * @param {number} rating
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement 
	 */
	addQuestionRating(question, rating) {

	}



	/**
	 * @description get an account from the database using AcctID
	 * 
	 * @param {number} AcctID 
	 * 
	 * @return {Account}
	 * 
	 * @todo implement
	 */
	static getAccount(AcctID) {

	}

	/**
	 * @description get an account from the database using username and password
	 * 
	 * @param {string} username 
	 * @param {string} password 
	 * 
	 * @return {Account}
	 * 
	 * @todo implement
	 */
	static getAccount(username, password) {

	}

	/**
	 * @description add an account to the database
	 * 
	 * @param {Account} account 
	 * 
	 * @todo implement
	 */
	static addAccount(account) {

	}
}