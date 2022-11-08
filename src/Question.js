export default class Question {
	id;
	type;
	question;
	answers;

	/**
	 * @const
	 */
	static FRQ_MAX_LENGTH = 4;

	/**
	 * The types that Question can have
	 * 
	 * @author Connor Funk
	 * 
	 * @private
	 * @enum
	 */
	static QType = Object.freeze({
		mc: Symbol("mc"),					// multiple choice
		all_apply: Symbol("all_apply"),		// check all that apply
		frq: Symbol("frq"),					// free response
	})

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * 
	 * @param {number} id
	 * @param {QType} type 
	 * @param {string} question 
	 * @param {string[]} answers 
	 */
	Question(id, type, question, answers) {
		this.id = id;
		this.type = type;
		this.question = question;
		this.answers = answers;
	}
}



