class QuestionAnswer {
	qid;
	acctID;
	answer;
	
	/**
	 * @author Connor Funk
	 * 
	 * @constructor
	 * 
	 * @param {number} id 
	 * @param {number} acctID 
	 * @param {number|string} answer 
	 */
	constructor(qid, acctID, answer) {
		this.qid = qid;
		this.acctID = acctID;
		this.answer = answer;
	}
}

if(typeof(module) === 'object') {
	module.exports = QuestionAnswer;
}