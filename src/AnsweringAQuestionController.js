
class AnsweringAQuestionController {
	static QuestionAnswer = require("./QuestionAnswer");
	static Question = require("./Question");
	static DatabaseManager = require("./DatabaseManager");

	/**
	 * @description gets a random question from the database
	 * 
	 * @author Connor Funk
	 * 
	 * @param {number} acctID
	 * 
	 * @returns {Question} 
	 */
	static getRandomQuestion(acctID) {
		const DatabaseManager = require("./DatabaseManager");
		return DatabaseManager.getRandomQuestion(acctID);
	}

	/**
	 * @description returns question with QID
	 * 
	 * @author Connor Funk
	 * 
	 * @param {number} QID	
	 * 
	 * @returns {Question}
	 */
	static getQuestionFromQID(QID) {
		const DatabaseManager = require("./DatabaseManager");
		return DatabaseManager.getQuestionFromQID(QID);
	}

	/**
	 * @description add a response to a question if it is valid
	 * 
	 * @author Connor Funk
	 * 
	 * @param {Question} question - the question to be answered
	 * @param {number} acctID - the id of the account that answered the question
	 * @param {number | string} response - the users response to the question 
	 * 
	 * @returns {number} 0 on success, negative on Database fail
	 * 
	 * @throws {RangeError} see checkValidResponse type functions for details
	 * @throws {TypeError} see checkValidResponse type functions for details
	 * 
	 * 
	 */
	static addQuestionAnswer(question, acctID, response){
		let qa;
		console.log("response: " + response)
		switch (question.type) {
			case (this.Question.QType.mc) :
				AnsweringAQuestionController.verifyMCQAnswer(question, parseInt(response));
				qa = new this.QuestionAnswer(question.id, acctID, parseInt(response));
				break;
			case (this.Question.QType.all_apply) :
				AnsweringAQuestionController.verifyAllApplyAnswer(question, parseInt(response));
				qa = new this.QuestionAnswer(question.id, acctID, parseInt(response));
				break;
			case (this.Question.QType.frq) :
				AnsweringAQuestionController.verifyFRQAnswer(question, response);
				qa = new this.QuestionAnswer(question.id, acctID, response);
				break;
			default :
				throw new TypeError("'" + question.type + "'is not a valid type");
		}
		return this.DatabaseManager.addQuestionAnswer(qa);
	}

	/**
	 * @description checks if a multiple choice question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {Question} question - the question to be answered
	 * @param {number} response
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 * 
	 */
	static verifyMCQAnswer(question, response) {
		if(typeof(response) !== 'number') {
			throw new TypeError("'" + response + "' is not 'number'");
		} else if( response % 1 !== 0) {
			throw new TypeError("'" + response + "' is not an int");
		} else if(response >= question.answers.length || response < 0) {
			throw new RangeError("'" + response + "' is out of range [0," + question.answers.length + "]");
		}
	}

	/**
	 * @description checks if a 'check all that apply' question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {Question} question - the question to be answered
	 * @param {number} response 
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 */
	static verifyAllApplyAnswer(question, response) {
		if(typeof(response) !== 'number') {
			throw new TypeError("'" + response + "' is not 'number'");
		} else if( response % 1 !== 0) {
			throw new TypeError("'" + response + "' is not an int");
		} else if(response >= (1 << question.answers.length) || response <= 0) {
			throw new RangeError("'" + response + "' is out of range (0," + (1 << question.answers.length) + ")");
		}
	}

	/**
	 * @description checks if a 'free response' question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {Question} question - the question to be answered
	 * @param {string} response
	 * 
	 * @throws {TypeError} when response is not a string
	 * @throws {RangeError} when response is empty or too long
	 */
	static verifyFRQAnswer(question, response) {
		if(typeof(response) !== 'string') {
			throw new TypeError("'" + response + "' is not 'string'");
		} else if( response.length === 0) {
			throw new RangeError("response is empty");
		} else if(response.length > this.Question.FRQ_MAX_LENGTH) {
			throw new RangeError("'" + response + "' is too long");
		}
	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {number} rating 
	 * 
	 * @returns 0 on success, negative otherwise
	 * 
	 * @throws {TypeError} when rating is not an integer
	 * @throws {RangeError} when 0 <= rating <= 9 is false
	 */
	static addQuestionRating(question, rating) {
		if(typeof(rating) !== 'number') {
			throw "TypeError: '" + rating + "' is not 'number'";
		} else if(rating <=  0 || rating > 5) {
			throw "RangeError: '" + rating + "' is out of range [1,5]";
		} else if(rating % 1 !== 0) {
			throw "TypeError: '" + rating + "' is not an int";
		}
		return this.DatabaseManager.addQuestionRating(question.id, rating);
	}
}

if(typeof(module) === 'object') {
	module.exports = AnsweringAQuestionController;
}