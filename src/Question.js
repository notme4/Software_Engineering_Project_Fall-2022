class Question {
	id;
	type;
	question;
	answers;
	rating;

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
		mc: "mc",					// multiple choice
		all_apply: "all_apply",		// check all that apply
		frq: "frq",					// free response
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
		this.answers = answers.map((answer) => {
			let obj = new Object()
			obj["answer"] = answer;
			obj["chosen"] = 0;
			return obj;
		});
		this.rating = new Rating()
	}

	static addRating(question, rating) {
		Rating.addRating(question.rating, rating)
	}
}

class Rating {
	score;
	respondents;

	constructor() {
		this.rating = 0;
		this.respondents = 0;
	}

	static addRating(rating, score) {
		let r = (rating.score * rating.respondents) + score
		console.log(r)
		rating.respondents++;
		rating.score = r / rating.respondents;
	}
}

if(typeof(module) === 'object') {
	module.exports = Question;
}