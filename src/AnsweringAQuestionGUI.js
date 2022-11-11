if(typeof(require) === 'function' ) {
	const AnsweringAQuestionController = require("../src/AnsweringAQuestionController");
	const Question = require("../src/Question");
}

const LOWER_CASE = 97;
const UPPER_CASE = 65;
const ERR_ACCT_ID = -1;
let acctID = ERR_ACCT_ID;
let question;
let response;

/**
 * @description loads important data for answering a question.
 * 				called when question.html loads.
 * 
 * @author Connor Funk
 */
function LoadPage() {
	srch = window.location.search;
	if(srch.length > 0) {
		regex = /\??qid=-?\d+/;
		qid = srch.split('&').find(element => regex.test(element) );
		if(typeof(qid) === 'string') {
			while(!qid.charAt(0).match(/[\d-]/) ) {
				qid = qid.substring(1);
			}
			question = AnsweringAQuestionController.getQuestionFromQID(Number.parseInt(qid) );
		}
	}

	if(typeof(question) !== 'object' || !(question instanceof Question) ) {
		question = AnsweringAQuestionController.getRandomQuestion();
	}
	buildQuestion();
}

/**
 * @description builds the html for a question
 * 
 * @author Connor Funk
 */
function buildQuestion() {
	let result = "<h1 class='question'>" + question.question + "</h1>\n"
	switch(question.type) {
		case (Question.QType.mc) :
			result += buildMCQuestion();
			break;
		case (Question.QType.all_apply) :
			result += buildAllApplyQuestion();
			break;
		case (Question.QType.frq) :
			result += buildFRQuestion()
			break;
		default :
			result = "invalid Question";
	}
	document.getElementById("Question").innerHTML = result;
}

/**
 * @description builds html for a multiple choice question
 * 
 * @author Connor Funk
 * 
 * @returns {string} html tags for a multiple choice question
 * 
 * @todo switch to radio
 */
function buildMCQuestion() {
	let result = "";
	char = UPPER_CASE;
	for (i in question.answers) {
		id = (char - UPPER_CASE);
		result += "<div display='inline-block'>\n";
		result += "<input id='" + id + "' type='button' onclick='chooseResponseMC(" + id + ")' value='" + String.fromCharCode(char) + "' class='button' style='border-radius: 50%;'>\n";
		result += "<p'>" + question.answers[i] + "</p>\n";
		result += "</div>\n";
		char++;
	}
	return result;
}

/**
 * @description builds html for an all apply question
 * 
 * @author Connor Funk
 * 
 * @returns {string} html tags for an all apply question
 */
function buildAllApplyQuestion() {
	let result = "";
	char = LOWER_CASE;
	for (i in question.answers) {
		id = (1 << (char - LOWER_CASE) );
		result += "<div display='inline-block'>\n";
		result += "\t<input id='" + id + "' type='button' onclick='chooseResponseAllApply(" + id + ")' value='" + String.fromCharCode(char) + "' class='button'>\n";
		result += "\t<p'>" + question.answers[i] + "</p>\n";
		result += "</div>\n";
		char++;
	}
	return result;
}

/**
 * @description builds html for a free response question
 * 
 * @author Connor Funk
 * 
 * @returns {string} html tags for a free response question
 */
function buildFRQuestion() {
	let result = "<div style='text-align: center;'>";
	result += "<textarea id='frq-text' maxlength='" + Question.FRQ_MAX_LENGTH + "' cols='50' rows='5' wrap='soft' style='resize:none;' oninput='chooseResponseFRQ()' autofocus></textarea>\n";
	result += "<div style='text-align: right; margin-right: 18%; margin-top: -3%;'>";
	result += "<p id='frq-length'>" + Question.FRQ_MAX_LENGTH + "</p>"
	return result + "</div>";
}

/**
 * @description updates the response to the question and opens the 
 * 				submit button.
 * 
 * @author Connor Funk
 * 
 * @param {number} choice - number representing the button clicked
 */
function chooseResponseMC(choice) {
	response = choice;
	for(i in question.answers) {
		//document.getElementById(i).style.backgroundColor = "revert";
		document.getElementById(i).className = "button";
	}
	//document.getElementById(choice).style.backgroundColor = "#008CBA";
	document.getElementById(choice).className += " button-chosen";
	//document.style.backgroundColor = ""
	openSubmitButton();
}

/**
 * @description updates the response to the question and opens the 
 * 				submit button. Closes it again if all responses are
 * 				unchosen.
 * 
 * @author Connor Funk
 * 
 * @param {number} choice - number representing the button clicked
 */
function chooseResponseAllApply(choice) {
	if(typeof(response) === 'undefined') {
		response = 0;
	}
	openSubmitButton();
	let className = "button";
	if( (response & choice) == 0) {
		className += " button-chosen";
	}
	response = response ^ choice;

	document.getElementById(choice).className = className;
	if(response == 0) {
		closeSubmitButton();
	}
}

/**
 * @description updates the response to the question and opens the 
 * 				submit button. Closes it again if the responses is 
 * 				empty.
 * 
 * @author Connor Funk
 * 
 */
function chooseResponseFRQ() {
	response = document.getElementById("frq-text").value;
	document.getElementById("frq-length").innerHTML = Question.FRQ_MAX_LENGTH - response.length;
	if(response == "") {
		closeSubmitButton();
	} else {
		openSubmitButton();
	}
}

/**
 * @description makes the submit button available
 * 
 * @author Connor Funk
 */
function openSubmitButton() {
	document.getElementById("Submit").innerHTML = "<input type='Submit' onclick='addQuestionAnswer()'>";
}

/**
 * @description makes the submit button no longer available
 * 
 * @author Connor Funk
 */
function closeSubmitButton() {
	document.getElementById("Submit").innerHTML = "";
}

/**
 * @description adds the response to the question to the database and opens
 * 				the rating and next options.
 * 				called when the submit button is clicked.
 */
function addQuestionAnswer() {
	AnsweringAQuestionController.addQuestionAnswer(question, acctID, response);
	document.getElementById("next").innerHTML = "<a href='home.html' class=''>" +
													"<input type='button' value='home' class='button'>" +
												"</a>" + 
												"<a href='Question.html?qid=random' class='new_question'>" +
													"<input type='button' value='New Question' class='button'>" +
												"</a>";
	document.getElementById("rating").innerHTML = "<input id='star5' name='rate' type='radio' value='5' oninput='AnsweringAQuestionController.addRating(question, 5)'>" +
													"<label for='star5' title='5'></label>" +
													"<input id='star4' name='rate' type='radio' value='4' oninput='AnsweringAQuestionController.addRating(question, 4)'>" +
													"<label for='star4' title='4'></label>" +
													"<input id='star3' name='rate' type='radio' value='3' oninput='AnsweringAQuestionController.addRating(question, 3)'>" +
													"<label for='star3' title='3'></label>" +
													"<input id='star2' name='rate' type='radio' value='2' oninput='AnsweringAQuestionController.addRating(question, 2)'>" +
													"<label for='star2' title='2'></label>" +
													"<input id='star1' name='rate' type='radio' value='1' oninput='AnsweringAQuestionController.addRating(question, 1)'>" +
													"<label for='star1' title='1'></label>";

}

/**
 * @description adds the question rating to the database.
 */
function addQuestionRating() {
	AnsweringAQuestionController.addQuestionRating();
}