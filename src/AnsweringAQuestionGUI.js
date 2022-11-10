if(typeof(require) === 'function' ) {
	const AnsweringAQuestionController = require("../src/AnsweringAQuestionController");
	const Question = require("../src/Question");
}

let question;
let response;
const LOWER_CASE = 97;
const UPPER_CASE = 65;

function LoadQuestion() {
	if(typeof(question) !== 'object' || !(question instanceof Question) ) {
		question = AnsweringAQuestionController.getRandomQuestion();
		console.log(question);
	}
}

function buildQuestion() {
	LoadQuestion();
	let result = "<h1>" + question.question + "</h1>\n"
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
	console.log(result);
	document.getElementById("Question").innerHTML = result;
}

/**
 * return html for a MC question
 * 
 * 
 */
function buildMCQuestion() {
	let result = "";
	char = UPPER_CASE;
	for (i in question.answers) {
		id = (char - 65);
		result += "<input id='" + id + "' type='button' onclick='chooseResponseMC(" + id + ")' value='" + String.fromCharCode(char) + "'>\n";
		result += "<p>" + question.answers[i] + "</p>\n";
		char++;
	}
	console.log("\n\n");
	console.log(result);
	return result;
}

function buildAllApplyQuestion() {
	let result = "";
	char = LOWER_CASE;
	for (i in question.answers) {
		id = (1 << (char - LOWER_CASE) );
		result += "<input id='" + id + "' type='button' onclick='chooseResponseAllApply(" + id + ")' value='" + String.fromCharCode(char) + "'>\n";
		result += "<p>" + question.answers[i] + "</p>\n";
		char++;
	}
	console.log("\n\n");
	console.log(result);
	return result;
}

function buildFRQuestion() {
	return "<input id='frq'>"
}

function chooseResponseMC(choice) {
	response = choice;
	for(i in question.answers) {
		document.getElementById(i).style.backgroundColor = "revert";
	}
	document.getElementById(choice).style.backgroundColor = "#008CBA";
	//document.style.backgroundColor = ""
	openSubmitButton();
}

function chooseResponseAllApply(choice) {
	if(typeof(response) === 'undefined') {
		response = 0;
	}
	openSubmitButton();
	let bgColor;
	console.log(response & choice);
	if( (response & choice) == 0) {
		bgColor = "#008CBA";
		response += choice;
	} else {
		bgColor = "revert";
		response -= choice;
	}
	document.getElementById(choice).style.backgroundColor = bgColor;
	if(response == 0) {
		closeSubmitButton();
	}
}

function openSubmitButton() {
	document.getElementById("Submit").innerHTML = "<input type='Submit' onclick='addQuestionResponse()'>";
}

function closeSubmitButton() {
	document.getElementById("Submit").innerHTML = "";
}

function addQuestionResponse() {
	alert("Response is: " + response);
	AnsweringAQuestionController.addQuestionResponse(question, response);
}

function addQuestionRating() {
	AnsweringAQuestionController.addQuestionRating();
}