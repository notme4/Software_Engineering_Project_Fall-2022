import Question from "./Question.js"
import Database from "./DatabaseManager.js";
//import Ans_Q_GUI from "./AnsweringAQuestionGUI.js"

export default class AnsweringAQuestionController {

	question;

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * @param {?Question|number} [question=random] 
	 */
	AnsweringAQuestionController(question) {
		if(question === null) {
			question = Database.getQuestion();
		
		} else if(typeof(question) === "number") {
			question = Database.getQuestion(question);
		}
		this.question = question;
	}

	/**
	 * @description add a response to a question if it is valid
	 * 
	 * @author Connor Funk
	 * 
	 * @param {int|string} response - the users response to the question 
	 * 
	 * @returns {number} 0 on success, negative on Database fail
	 * 
	 * @throws {RangeError} see checkValidResponse type functions for details
	 * @throws {TypeError} see checkValidResponse type functions for details
	 * 
	 * @todo come up with a better name
	 */
	addQuestionResponse(response){
		switch (this.question.type) {
			case (Question.Q_type.mc) :
				checkValidResponseMC(response);
				break;
			case (Question.Q_type.all_apply) :
				checkValidResponseAllApply(response);
				break;
			case (Question.Q_type.frq) :
				checkValidResponseFRQ(response);
				break;
			default :
				throw "TypeError: '" + this.question.type + "'is not a valid type";
		}
		return Database.addQuestionAnswer(this.question, response);
	}

	/**
	 * @description checks if a multiple choice question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {number} response 
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 * 
	 */
	static checkValidResponseMC(response) {
		if(typeof(response) !== 'number') {
			throw "TypeError: '" + response + "' is not 'number'";
		} else if( response % 1 !== 0) {
			throw "TypeError: '" + response + "' is not an int";
		} else if(response >= this.question.choices.length || response < 0) {
			throw "RangeError: '" + response + "' is out of range [0," + this.question.choices.length + "]";
		}
	}

	/**
	 * @description checks if a 'check all that apply' question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {number} response 
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 */
	static checkValidResponseAllApply(response) {
		if(typeof(response) !== 'number') {
			throw "TypeError: '" + response + "' is not 'number'";
		} else if( response % 1 !== 0) {
			throw "TypeError: '" + response + "' is not an int";
		} else if(response >= (1 << this. question.choices.length) || response <= 0) {
			throw "RangeError: '" + response + "' is out of range (0," + (1 << this. question.choices.length) + ")";
		}
	}

	/**
	 * @description checks if a 'free response' question response is valid 
	 * 
	 * @author Connor Funk
	 * 
	 * @param {string} response
	 * 
	 * @throws {TypeError} when response is not a string
	 * @throws {RangeError} when response is empty or too long
	 */
	static checkValidResponseFRQ(response) {
		if(typeof(response) !== 'string') {
			throw "TypeError: '" + response + "' is not 'string'";
		} else if( response.length === 0) {
			throw "RangeError: response is empty";
		} else if(response.length > Question.FRQ_MAX_LENGTH) {
			throw "RangeError: '" + response + "' is too long";
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
	addRating(rating) {
		if(typeof(rating) !== 'number') {
			return -2;
			// throw "TypeError: '" + rating + "' is not 'number'";
		} else if(rating <  0 || rating >= 10) {
			return -4;
			// throw "RangeError: '" + rating + "' is out of range [0,9]";
		} else if(rating % 1 !== 0) {
			return -3;
			// throw "TypeError: '" + rating + "' is not an int";
		}
		return Database.addRating(this.question, rating);
	}
}

