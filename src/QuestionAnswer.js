if(typeof(require) === 'function' ) {
	const Question = require("./Question.js");
}
class QuestionAnswer {
	qid;
	acctID;
	response;

	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {number} acctID 
	 * @param {number|string} response
	 */
	constructor(qid, acctID, response) {
		this.qid = qid;
		this.acctID = acctID;
		this.response = response;
	}
}

if(typeof(module) === 'object') {
	module.exports = QuestionAnswer;
}