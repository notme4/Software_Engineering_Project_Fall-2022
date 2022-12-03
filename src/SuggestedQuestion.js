const Question = require("./Question.js");

class SuggestedQuestion {
	question;
	type;
	acctID;
	date;

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {number} acctID 
	 */
	constructor(question, type, acctID) {
		this.question = question;
		this.type = type
		this.acctID = acctID;
		this.date = new Date();
	}
}

module.exports = SuggestedQuestion;