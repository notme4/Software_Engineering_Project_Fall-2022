const LOWER_CASE = 97;
const UPPER_CASE = 65;

function load() {
	acctID = new URL(document.URL).searchParams.get('acctID')
	if(acctID == null) {
		acctID = -1;
	}
	console.log(acctID);
	document.getElementById("acctID").value = acctID;
	document.getElementById("acctIDr").value = acctID;
}

function addRatingAndNext() {
	document.getElementById("next").innerHTML = "<div class=flex-between>" +
													"<a href='home.html' class=''>" +
														"<input type='button' value='home' class='button'>" +
													"</a>" + 
													"<a href='Question.html?qid=random' class='new_question'>" +
														"<input type='button' value='New Question' class='button'>" +
													"</a>" +
												"</div>"	
	document.getElementById("rating").innerHTML = "<input id='star5' name='rate' type='radio' value='5'>" +
													"<label for='star5' title='5'></label>" +
													"<input id='star4' name='rate' type='radio' value='4'>" +
													"<label for='star4' title='4'></label>" +
													"<input id='star3' name='rate' type='radio' value='3'>" +
													"<label for='star3' title='3'></label>" +
													"<input id='star2' name='rate' type='radio' value='2'>" +
													"<label for='star2' title='2'></label>" +
													"<input id='star1' name='rate' type='radio' value='1'>" +
													"<label for='star1' title='1'></label>";

}

function buildQuestion() {
	let result = "<h1 class='question'>" + question.question + "</h1>\n"
	switch(question.type) {
		case (Question.QType.mc) :
			result += buildMCQuestion(question);
			break;
		case (Question.QType.all_apply) :
			result += buildAllApplyQuestion(question);
			break;
		case (Question.QType.frq) :
			result += buildFRQuestion(question)
			break;
		default :
			result = "invalid Question";
	}
	document.getElementById("question").innerHTML = result;
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
 function buildMCQuestion(question) {
	let result = "";
	char = UPPER_CASE;
	for (i in question.answers) {
		id = char - UPPER_CASE;
		result += `<label onclick='chooseResponseMC(${id})'>`;
		result +=	`<input id='${id}' name='question' value='${question.answers[i]["response"]}' type='radio' class='button' style='border-radius: 50%;'>`;
		result +=	`<p>	${question.answers[i]["response"]}</p>`;
		result += "</label><br>";
		char++;
	}
	document.getElementById("qid").value = question.id;
	document.getElementById("qidr").value = question.id;
	return result;
}

/**
 * @description builds html for an all apply question
 * 
 * @author Connor Funk
 * 
 * @returns {string} html tags for an all apply question
 */
function buildAllApplyQuestion(question) {
	let result = "";
	char = LOWER_CASE;
	for (i in question.answers) {
		id = (1 << (char - LOWER_CASE) );
		result += `<label onclick='chooseResponseAllApply(${id});'>`;
		result += 	`<input id='${id}' name='question${id}' value='${question.answers[i]["response"]}' type='checkbox' class='button'>`;
		result += 	`<p>	${question.answers[i]["response"]}</p>`;
		result += "</label> <br>";
		char++;
	}
	document.getElementById("qid").value = question.id;
	document.getElementById("qidr").value = question.id;
	return result;
}

/**
 * @description builds html for a free response question
 * 
 * @author Connor Funk
 * 
 * @returns {string} html tags for a free response question
 */
function buildFRQuestion(question) {
	let result = "<div style='text-align: center;'>";
	result += "<textarea id='frq-text' name='question' maxlength='" + Question.FRQ_MAX_LENGTH + "' cols='50' rows='5' wrap='soft' style='resize:none;' autofocus oninput='chooseResponseFRQ()'></textarea>\n";
	result += "<div style='text-align: right; margin-right: 18%; margin-top: -3%;'>";
	result += "<p id='frq-length'>" + Question.FRQ_MAX_LENGTH + "</p>"

	document.getElementById("qid").value = question.id;
	document.getElementById("qidr").value = question.id;
	return result + "</div>";
}



/**
 * @description makes the submit button available
 * 
 * @author Connor Funk
 */
 function openSubmitButton() {
	document.getElementById("Submit").outerHTML = "<input id='Submit' type='Submit' class='flex-between'>";

}

/**
 * @description makes the submit button no longer available
 * 
 * @author Connor Funk
 */
function closeSubmitButton() {
	document.getElementById("Submit").outerHTML = "<div id='Submit' type='Submit' class='flex-between'> </div>";
}

function chooseResponseMC(input) {
	if (response == 0) {
		openSubmitButton()
	}
	response = input;
	document.getElementById('response').value = response;
}

function chooseResponseAllApply(input) {
	if (response == 0) {
		openSubmitButton()
	}
	response = 0;
	for (let i = 0; i < question.answers.length; i++) {
		let int = 1 << i;
		response += document.getElementById(int).checked == 1 ? int : 0;
	}
	if (response == 0) {
		closeSubmitButton()
	}
	document.getElementById('response').value = response;
}

function chooseResponseFRQ(input) {
	response = document.getElementById("frq-text").value;
	if(response == "") {
		closeSubmitButton();
	} else {
		openSubmitButton();
	}
	document.getElementById("frq-length").innerHTML = Question.FRQ_MAX_LENGTH - response.length;
	document.getElementById('response').value = response;
}