import Question from "../src/Question";
//import Ans_Q_GUI from "./Answering_A_Question_GUI.js";
import AnsQController from "../src/AnsweringAQuestionController";

testCheckValidResponseMC();
testCheckValidResponseAllApply();
testCheckValidResponseFRQ();
testCheckValidResponse();
testCheckValidRating();

/**
 * Asserts that actual is strictly equal to expected
 * 
 * @author Connor Funk
 * 
 * @param {*} expected - the expected value
 * @param {*} actual - the actual value
 * 
 * @throws {AssertError} when assertion is false
 */
function assertEqual(expected, actual) {
	if(actual !== expected) {
		throw ("AssertError: got: '" + actual + "' but expected: '" + expected + "'");
	}
}

/**
 * Asserts that fun returns expected when passed ...args
 * 
 * Note: there are 2 ways to pass functions with arguments
 * 		 1) you can pass the function with arguments as () => fun(args)
 * 		 2) you can pass the arguments as a comma seperated list after fun (i.e. fun, args1, args2, ...)
 * 
 * @author Connor Funk
 * 
 * @param {*} expected - the expected return of fun
 * @param {function} fun - the function to be called
 * @param  {...any} args - the arguments to be passed to fun
 * 
 * @throws {AssertError} when assertion is false
 */
function assertEqualFunction(expected, fun, ...args) {
	let actual = fun(...args);
	if(expected !== actual) {
		throw ("AssertError: got: '" + actual + "' from " + fun + " but expected: '" + expected + "'");
	}
}

/**
 * Asserts that fun throws an exception matching expected when passed ...args
 * 
 * Note: there are 2 ways to pass functions with arguments
 * 		 1) you can pass the function with arguments as () => fun(args)
 * 		 2) you can pass the arguments as a comma seperated list after fun (i.e. fun, args1, args2, ...)
 * 
 * @author Connor Funk
 * 
 * @param {regex} expected - the regex of the exception expected to be thrown by fun
 * @param {function} fun - the function to be called
 * @param {...any} args - the arguments to be passed to fun
 * 
 * @throws {AssertError} when assertion is false
 */
function assertCatch(expected, fun, ...args) {
	let threw_exception = false;
	try {
		fun(...args);

	} catch (err) {
		threw_exception = true;
		if(!err.toString().match(expected) ) {
			throw ("AssertError: '" + err + "' from '" + fun + "' does not match: '" + expected + "'");
		}
	}
	if(!threw_exception) {
		throw ("AssertError: expected catch but no error thrown from " + fun);
	}
}


function testCheckValidResponse() {
	let q = new Question(-1, "type", "invalid", [0, 1, 2, 3]);
	let controller = new AnsQController(q);

	assertCatch("question is not a valid type: '.*'", () => controller.addQuestionResponse(0) );

	testCheckValidResponseMC();
	testCheckValidResponseAllApply();
	testCheckValidResponseFRQ();
}

function testCheckValidResponseMC() {
	let q = new Question(-1, Question.Q_type.mc, "mcq", [0, 1, 2, 3]);
	let controller = new AnsQController(q);

	assertEqualFunction(0, () => controller.addQuestionResponse(1) );

	assertCatch("RangeError: '-?\\d+' is out of range \\[0,\\d+\\]", () => controller.addQuestionResponse(-1) );
	assertCatch("RangeError: '-?\\d+' is out of range \\[0,\\d+\\]", () => controller.addQuestionResponse(16) );
	assertCatch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.addQuestionResponse(0.5) );
	assertCatch("TypeError: '.+' is not 'number'" , () => controller.addQuestionResponse() );
	assertCatch("TypeError: '.+' is not 'number'", () => controller.addQuestionResponse("string") );
}

function testCheckValidResponseAllApply() {
	let q = new Question(-1, Question.Q_type.all_apply, "all_apply", [0, 1, 2, 3]);
	let controller = new AnsQController(q);

	assertEqualFunction(0, () => controller.checkValidResponseAllApply(1) );

	assertCatch("RangeError: '-?\\d+' is out of range \\(0,\\d+\\)", () => controller.addQuestionResponse(0) );
	assertCatch("RangeError: '-?\\d+' is out of range \\(0,\\d+\\)", () => controller.addQuestionResponse(16) );
	assertCatch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.addQuestionResponse(0.5) );
	assertCatch("TypeError: '.+' is not 'number'", () => controller.addQuestionResponse() );
	assertCatch("TypeError: '.+' is not 'number'", () => controller.addQuestionResponse("string") );
}

function testCheckValidResponseFRQ() {
	let q = new Question(-1, Question.Q_type.frq, "frq");
	let controller = new AnsQController(q);

	assertEqualFunction(0, () => controller.checkValidResponseFRQ("hi") );

	assertCatch("RangeError: response is empty", () => controller.addQuestionResponse("") );
	assertCatch("RangeError: '.+' is too long", () => controller.addQuestionResponse("hello") );
	assertCatch("TypeError: '.+' is not 'string'", () => controller.addQuestionResponse() );
	assertCatch("TypeError: '.+' is not 'string'", () => controller.addQuestionResponse(1) );
}

function testCheckValidRating() {
	let q = new Question(-1, Question.Q_type.frq, "frq");
	let controller = new AnsQController(q);
	
	assertEqualFunction(0, () => controller.addRating(2) );

	assertCatch("RangeError: '-?\\d+' is out of range \\[0,9\\]", () => controller.addRating(-1) );
	assertCatch("RangeError: '-?\\d+' is out of range \\[0,9\\]", () => controller.addRating(10) );
	assertCatch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.addRating(0.5) );
	assertCatch("TypeError: '.*' is not 'number'", () => controller.addRating() );
	assertCatch("TypeError: '.*' is not 'number'", () => controller.addRating("test") );
}

// timestamping tests to help differentiate between tests, esp. successful ones
Date.prototype.getMonthString = function () {
	switch (this.getMonth()) {
		case 0: return "Jan.";
		case 1: return "Feb.";
		case 2: return "Mar.";
		case 3: return "Apr.";
		case 4: return "May";
		case 5: return "June";
		case 6: return "July";
		case 7: return "Aug.";
		case 8: return "Sep.";
		case 9: return "Oct.";
		case 10: return "Nov.";
		case 11: return "Dec.";
	}
}
Date.prototype.today = function () { 
    return (this.getMonthString() + " " + ( (this.getDate() < 10)?"0":"") + this.getDate() +", "+ this.getFullYear() );
}
// For the time now
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
Date.prototype.getFullTime = function () {
	return this.today() + " @ " + this.timeNow();
}
console.log(new Date().getFullTime() );
