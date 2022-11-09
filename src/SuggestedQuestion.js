import Question from "./Question.js"

export default class SuggestedQuestion extends Question {
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
	SuggestedQuestion(id, type, question, answers, acctID) {
		this.acctID = acctID;
		this.date = new Date();
		super(id, type, question, answers);
	}
}