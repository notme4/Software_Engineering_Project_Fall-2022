if(typeof(require) === 'function' ) {
	const QuestionAnswer = require("./QuestionAnswer");
	const Question = require("./Question");
	const DatabaseManager = require("./DatabaseManager");
}
class AnsweringAQuestionController {

	/**
	 * @description gets a random question from the database
	 * 
	 * @author Connor Funk
	 * 
	 * @returns {Question} 
	 */
	static getRandomQuestion() {
		return DatabaseManager.getRandomQuestion();
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
		switch (question.type) {
			case (Question.QType.mc) :
				AnsweringAQuestionController.checkValidResponseMC(question, response);
				break;
			case (Question.QType.all_apply) :
				AnsweringAQuestionController.checkValidResponseAllApply(question, response);
				break;
			case (Question.QType.frq) :
				AnsweringAQuestionController.checkValidResponseFRQ(question, response);
				break;
			default :
				throw new TypeError("'" + question.type + "'is not a valid type");
		}
		return DatabaseManager.addQuestionAnswer(new QuestionAnswer(question.id, acctID, response) );
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
	static checkValidResponseMC(question, response) {
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
	static checkValidResponseAllApply(question, response) {
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
	static checkValidResponseFRQ(question, response) {
		if(typeof(response) !== 'string') {
			throw new TypeError("'" + response + "' is not 'string'");
		} else if( response.length === 0) {
			throw new RangeError("response is empty");
		} else if(response.length > Question.FRQ_MAX_LENGTH) {
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
	static addRating(question, rating) {
		if(typeof(rating) !== 'number') {
			return -1;
			// throw "TypeError: '" + rating + "' is not 'number'";
		} else if(rating <  0 || rating >= 10) {
			return -2;
			// throw "RangeError: '" + rating + "' is out of range [0,9]";
		} else if(rating % 1 !== 0) {
			return -3;
			// throw "TypeError: '" + rating + "' is not an int";
		}
		return DatabaseManager.addQuestionRating(question.id, rating);
	}
}

if(typeof(module) === 'object') {
	module.exports = AnsweringAQuestionController;
}