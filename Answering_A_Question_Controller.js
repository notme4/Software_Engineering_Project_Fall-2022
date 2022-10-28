import Question from "./Question.js"
import Ans_Q_GUI from "./Answering_A_Question_GUI.js"

export default class Answering_a_Question_Controller {

	question;

	constructor(question) {
		if(question === null) {
			// TODO: question = database.random_question();
		}
		this.question = question;
	}

	// return 0 if success
	// return -1 if database_add_response fails ?
	// throw error otherwise
	check_valid_response(response){
		switch (this.question.type) {
			case (Question.Q_type.mc) :
				return this.check_valid_response_mc(response);
			case (Question.Q_type.all_apply) :
				return this.check_valid_response_all_apply(response);
			case (Question.Q_type.frq) :
				return this.check_valid_response_frq(response);
			default :
				throw "question is not a valid type: '" + this.question.type + "'";
		}

	}

	check_valid_response_mc(response) {
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

	check_valid_response_all_apply(response) {
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

	check_valid_response_frq(response) {
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

	check_valid_rating(rating) {
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

