Question = require("./Question.js");

class SuggestedQuestion extends Question {
	acctID;
	date;

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {QType} type 
	 * @param {string} question 
	 * @param {string[]} answers 
	 * @param {number} acctID 
	 */
	constructor(id, type, question, answers, acctID) {
		super(id, type, question, answers);
		this.acctID = acctID;
		this.date = new Date();
	}
}

module.exports = SuggestedQuestion;