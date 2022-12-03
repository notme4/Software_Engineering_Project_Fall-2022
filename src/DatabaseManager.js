const SuggestedQuestion = require("./SuggestedQuestion.js");
const QuestionAnswer = require("./QuestionAnswer.js");
const Question = require("./Question");
const Account = require("./Account.js");
const fs = require("fs");
class DatabaseManager {
	static DBFolder = "./src/DB"
	static questionsFile = this.DBFolder + "/questions.json"
	static answersFile = this.DBFolder + "/answers.json"
	static accountsFile = this.DBFolder + "/accounts.json"
	static suggestionsFile = this.DBFolder + "/suggestions.json"
	static ratingsFile = this.DBFolder + "/ratings.json"
	static questions;
	static answers;
	static accounts;
	static suggestions;
	static ratings;

	static initialize() {
		fs.readFile(this.questionsFile, (err, data) => {
			if(err) {
				console.error(err) 
			}
			this.questions = JSON.parse(data);
		})
		fs.readFile(this.answersFile, (err, data) => {
			if(err) {
				console.error(err) 
			}
			this.answers = JSON.parse(data);
		})
		fs.readFile(this.accountsFile, (err, data) => {
			if(err) {
				console.error(err) 
			}
			this.accounts = JSON.parse(data);
		})
		fs.readFile(this.suggestionsFile, (err, data) => {
			if(err) {
				console.error(err) 
			}
			this.suggestions = JSON.parse(data);
		})
		fs.readFile(this.ratingsFile, (err, data) => {
			if(err) {
				console.error(err) 
			}
			this.ratings = JSON.parse(data);
		})
	}
	
	/**
	 * @description get a Question from ID
	 * 
	 * @param {number} qid 
	 * 
	 * @return {Question}
	 * 
	 */
	static getQuestionFromQID(qid) {
		for(let i in this.questions) {
			if(this.questions[i].id == qid){
				return this.questions[i];
			}
		}
		throw new Error("invalid qid: " + qid)

	}

	/**
	 * @description get a random Question
	 * NOTE: must not be a suggested Question
	 * 
	 * @param {number} acctID
	 * 
	 * @return {Question}
	 * 
	 */
	static getRandomQuestion(acctID) {
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
		this.questions.push(question);
		fs.writeFile(this.questionssFile, JSON.stringify(this.questions), err => {
			console.log("in write");
			if(err) {
				console.error(err);
				return -1
			}
		});
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
		this.answers.push(questionAnswer);
		console.log(this.answers)
		fs.writeFile(this.answersFile, JSON.stringify(this.answers), err => {
			console.log("in write");
			if(err) {
				console.error(err);
				return -1
			}
		});
		console.log("after write");
		return 0
	}

	/**
	 * @description get a suggested question that has ID QID
	 * 
	 * @param {number} qid 
	 * 
	 * @return {SuggestedQuestion}
	 * 
	 * @todo implement
	 */
	static getSuggestedQuestion(qid) {

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
		this.suggestions.push(suggestedQuestion)
		fs.writeFile(this.suggestions, JSON.stringify(this.suggestions), err => {
			console.log("in write");
			if(err) {
				console.error(err);
				return -1
			}
		});
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
	 * @param {number} qid
	 * @param {number} rating
	 * 
	 * @return {number} 0 for success, negative for failure
	 * 
	 * @todo implement 
	 */
	static addQuestionRating(qid, rating) {
		obj = new Object()
		obj['qid'] = qid;
		obj['rating'] = rating;
		this.ratings.push(obj);
		fs.writeFile(this.ratingsFile, JSON.stringify(this.ratingg), err => {
			console.log("in write");
			if(err) {
				console.error(err);
				return -1
			}
		});
		console.log(rating);
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
		this.accounts.push(account)
		fs.writeFile(this.accountsFile, JSON.stringify(this.accounts), err => {
			console.log("in write");
			if(err) {
				console.error(err);
				return -1
			}
		});
	}
}

if(typeof(module) === 'object') {
	module.exports = DatabaseManager;
}
