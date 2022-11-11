if(typeof(require) === 'function' ) {
	const AnsweringAQuestionController = require("../src/AnsweringAQuestionController");
	const Question = require("../src/Question");
}

let CF_ADMIN_ACCT_ID = -1;
let question;
let response;
const LOWER_CASE = 97;
const UPPER_CASE = 65;

function LoadQuestion() {
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
}

function buildQuestion() {
	LoadQuestion();
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
 * @description return html for a MC question
 * 
 * @author Connor Funk
 * 
 */
function buildMCQuestion() {
	let result = "";
	char = UPPER_CASE;
	for (i in question.answers) {
		id = (char - 65);
		result += "<div display='inline-block'>\n";
		result += "<input id='" + id + "' type='button' onclick='chooseResponseMC(" + id + ")' value='" + String.fromCharCode(char) + "' class='button' style='border-radius: 50%;'>\n";
		result += "<p'>" + question.answers[i] + "</p>\n";
		result += "</div>\n";
		char++;
	}
	return result;
}

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

function buildFRQuestion() {
	let result = "<div style='text-align: center;'>";
	result += "<textarea id='frq-text' maxlength='" + Question.FRQ_MAX_LENGTH + "' cols='50' rows='5' wrap='soft' style='resize:none;' oninput='chooseResponseFRQ()'></textarea>\n";
	result += "<div style='text-align: right; margin-right: 18%; margin-top: -3%;'>";
	result += "<p id='frq-length'>" + Question.FRQ_MAX_LENGTH + "</p>"
	return result + "</div>";
}

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

function chooseResponseFRQ() {
	response = document.getElementById("frq-text").value;
	document.getElementById("frq-length").innerHTML = Question.FRQ_MAX_LENGTH - response.length;
	if(response == "") {
		closeSubmitButton();
	} else {
		openSubmitButton();
	}
}

function openSubmitButton() {
	document.getElementById("Submit").innerHTML = "<input type='Submit' onclick='addQuestionAnswer()'>";
}

function closeSubmitButton() {
	document.getElementById("Submit").innerHTML = "";
}

function addQuestionAnswer() {
	AnsweringAQuestionController.addQuestionAnswer(question, CF_ADMIN_ACCT_ID, response);
}

function addQuestionRating() {
	AnsweringAQuestionController.addQuestionRating();
}