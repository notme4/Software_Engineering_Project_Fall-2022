import Question from "./Question.js"
//import Ans_Q_GUI from "./AnsweringAQuestionGUI.js"

export default class AnsweringAQuestionController {

	question;

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * @param {Question} [question=random] 
	 */
	AnsweringAQuestionController(question) {
		if(question === null) {
			// TODO: question = Database.getQuestion();
		}
		this.question = question;
	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {int|string} response - the users response to the question 
	 * 
	 * @returns {number} 0 on success, -1 on Database fail
	 * 
	 * @throws {RangeError} see checkValidResponse type functions for details
	 * @throws {TypeError} see checkValidResponse type functions for details
	 * 
	 */
	checkValidResponse(response){
		switch (this.question.type) {
			case (Question.Q_type.mc) :
				return this.checkValidResponseMC(response);
			case (Question.Q_type.all_apply) :
				return this.checkValidResponseAllApply(response);
			case (Question.Q_type.frq) :
				return this.checkValidResponseFRQ(response);
			default :
				throw "TypeError: '" + this.question.type + "'is not a valid type";
		}

	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {number} response 
	 * 
	 * @returns {number} 0 on success, -1 on database fail
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 */
	checkValidResponseMC(response) {
		if(typeof(response) !== 'number') {
			throw "TypeError: '" + response + "' is not 'number'";
		} else if( response % 1 !== 0) {
			throw "TypeError: '" + response + "' is not an int";
		} else if(response >= this.question.choices.length || response < 0) {
			throw "RangeError: '" + response + "' is out of range [0," + this.question.choices.length + "]";
		}
		// database_add_response(this.question, response);
		return 0;
		
	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {number} response 
	 * 
	 * @returns {number} 0 on success, -1 on database fail
	 * 
	 * @throws {TypeError} when response is not an integer
	 * @throws {RangeError} when response is not a valid response
	 */
	checkValidResponseAllApply(response) {
		if(typeof(response) !== 'number') {
			throw "TypeError: '" + response + "' is not 'number'";
		} else if( response % 1 !== 0) {
			throw "TypeError: '" + response + "' is not an int";
		} else if(response >= (1 << this. question.choices.length) || response <= 0) {
			throw "RangeError: '" + response + "' is out of range (0," + (1 << this. question.choices.length) + ")";
		}
		// database_add_response(this.question, response);
		return 0;
	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {string} response
	 * 
	 * @returns {number} 0 on success, -1 on database fail
	 * 
	 * @throws {TypeError} when response is not a string
	 * @throws {RangeError} when response is empty or too long
	 */
	checkValidResponseFRQ(response) {
		if(typeof(response) !== 'string') {
			throw "TypeError: '" + response + "' is not 'string'";
		} else if( response.length === 0) {
			throw "RangeError: response is empty";
		} else if(response.length > Question.FRQ_MAX_LENGTH) {
			throw "RangeError: '" + response + "' is too long";
		}
		// database.add_response(this.question, Database.sanitize(response));
		return 0;
	}

	/**
	 * @author Connor Funk
	 * 
	 * @param {number} rating 
	 * 
	 * @returns 0 on success, -1 on Database fail
	 * 
	 * @throws {TypeError} when rating is not an integer
	 * @throws {RangeError} when 0 <= rating <= 9 is false
	 */
	checkValidRating(rating) {
		if(typeof(rating) !== 'number') {
			throw "TypeError: '" + rating + "' is not 'number'";
		} else if(rating <  0 || rating >= 10) {
			throw "RangeError: '" + rating + "' is out of range [0,9]";
		} else if(rating % 1 !== 0) {
			throw "TypeError: '" + rating + "' is not an int";
		}
		// database.add_rating(this.question, rating);
		return 0;
	}
}

