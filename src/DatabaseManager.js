if(typeof(require) === 'function' ) {
	const SuggestedQuestion = require("./SuggestedQuestion.js");
	const QuestionAnswer = require("./QuestionAnswer.js");
	const Question = require("./Question.js");
	const Account = require("./Account.js");
}
class DatabaseManager {

	static questions = [
		new Question(1, Question.QType.mc, "what is your favorite class?", ["math", "science", "social studies", "english"]),
		new Question(2, Question.QType.all_apply, "which cereals do you like?", ["cheerios", "cinnamon toast crunch", "cocoa puffs", "marshmallow mateys"]),
		new Question(3, Question.QType.frq, "why do you hate math?", )
	];

	static questionAnswers = [
		new QuestionAnswer(1, -659_552_692, 1),
		new QuestionAnswer(1, 2, 2),
		new QuestionAnswer(1, 3, 4),
		new QuestionAnswer(2, 2, 2),
		new QuestionAnswer(2, -659_552_692, 15),
		new QuestionAnswer(2, 1, 5),
		new QuestionAnswer(3, 4, "math sucks"),
		new QuestionAnswer(3, -659_552_692, "I don't hate math"),
	];

	/**
	 * @description get a Question from ID
	 * 
	 * @param {number} qid 
	 * 
	 * @return {Question}
	 * 
	 * @todo implement
	 */
	static getQuestionFromQID(qid) {
		for(let i in this.questions) {
			if(this.questions[i].id == qid){
				return this.questions[i];
			}
		}
	}

	/**
	 * @description get a random Question
	 * NOTE: must not be a suggested Question
	 * 
	 * @return {Question}
	 * 
	 * @todo implement
	 */
	static getRandomQuestion() {
		let index = Math.floor(Math.random() * DatabaseManager.questions.length);
		return DatabaseManager.questions[index];
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
	 * @param {QuestionAnswer} questionAnswer 
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement
	 */
	static addQuestionAnswer(questionAnswer) {
		this.questionAnswers.push(questionAnswer);
		console.log(this.questionAnswers);
		return 0
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
	static addQuestionRating(question, rating) {
		return 0;
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
	static getAccountFromAcctID(AcctID) {

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
	static getAccountFromUsernamePassword(username, password) {

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

if(typeof(module) === 'object') {
	module.exports = DatabaseManager;
}
