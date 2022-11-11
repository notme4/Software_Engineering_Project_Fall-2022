const Question = require("./Question.js");

class SuggestedQuestion {
	qid;
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
	constructor(id, acctID) {
		this.qid = id;
		this.acctID = acctID;
		this.date = new Date();
	}
}

module.exports = SuggestedQuestion;