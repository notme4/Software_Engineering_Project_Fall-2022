const Question = require("./Question.js");

class QuestionAnswer extends Question {
	acctID;
	response;

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
	 * @param {number|string} response
	 */
	constructor(id, type, question, answers, acctID, response) {
		super(id, type, question, answers);
		this.acctID = acctID;
		this.response = response;
	}
}

if(typeof(module) === 'object') {
	module.exports = QuestionAnswer;
}