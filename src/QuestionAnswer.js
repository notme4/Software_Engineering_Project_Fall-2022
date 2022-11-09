import Question from "./Question.js"

export default class QuestionAnswer extends Question {
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
	QuestionAnswer(id, type, question, answers, acctID, response) {
		this.acctID = acctID;
		this.response = response;
		super(id, type, question, answers);
	}
}