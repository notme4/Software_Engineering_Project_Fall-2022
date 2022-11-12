class Question {
	id;
	type;
	question;
	answers;

	static FRQ_MAX_LENGTH = 200;

	static getFRQMaxLength() {
		alert('getFRQMaxLength')
		return this.FRQ_MAX_LENGTH;
	}

	/**
	 * @description The types that Question can have
	 * 
	 * @author Connor Funk
	 * 
	 * @typedef {object} QType
	 * @property {symbol} mc
	 * @property {symbol} all_apply
	 * @property {symbol} frq
	 * 
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
	constructor(id, type, question, answers) {
		this.id = id;
		this.type = type;
		this.question = question;
		this.answers = answers;
	}
}

if(typeof(module) === 'object') {
	module.exports = Question;
}