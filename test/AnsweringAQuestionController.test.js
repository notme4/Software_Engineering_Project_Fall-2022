const Question = require("../src/Question");
const AnsQController = require("../src/AnsweringAQuestionController");
const { QType } = require("../src/Question");

class AssertError extends Error {
	/**
	 * 
	 * @param {string | undefined} message 
	 */
	constructor(message) {
		super(message);
	}
}

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
function assertCatch(expectedErrorType, expectedErrorMessage, fun, ...args) {
	let threw_exception = false;
	try {
		fun(...args);

	} catch (err) {
		threw_exception = true;
		if(!err instanceof expectedErrorType) {
			throw new AssertError("'" + err + "' from '" + fun + "' is not an instance of " + expectedErrorType);
		}
		if(!err.message.match(expectedErrorMessage) ) {
			throw new AssertError("'" + err + "' from '" + fun + "' does not match: '" + expectedErrorMessage + "'");
		}
	}
	if(!threw_exception) {
		throw new AssertError("expected catch but no error thrown from " + fun);
	}
}


function testAddQuestionResponse() {
	let q = new Question(-1, "type", "invalid", [0, 1, 2, 3]);

	assertCatch(TypeError, "'.*'is not a valid type", () => AnsQController.addQuestionResponse(q, 0) );

	/*
	testCheckValidResponseMC();
	testCheckValidResponseAllApply();
	testCheckValidResponseFRQ();
	*/
}

function testCheckValidResponseMC() {
	let q = new Question(-1, QType.mc, "mcq", [0, 1, 2, 3]);

	assertEqualFunction(0, () => AnsQController.addQuestionResponse(q, 1) );

	assertCatch(RangeError, "'-?\\d+' is out of range \\[0,\\d+\\]", () => AnsQController.addQuestionResponse(q, -1) );
	assertCatch(RangeError, "'-?\\d+' is out of range \\[0,\\d+\\]", () => AnsQController.addQuestionResponse(q, 16) );
	assertCatch(TypeError, "'-?\\d+\\.\\d+' is not an int", () => AnsQController.addQuestionResponse(q, 0.5) );
	assertCatch(TypeError, "'.+' is not 'number'" , () => AnsQController.addQuestionResponse(q, ) );
	assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, "string") );
}

function testCheckValidResponseAllApply() {
	let q = new Question(-1, QType.all_apply, "all_apply", [0, 1, 2, 3]);

	assertEqualFunction(0, () => AnsQController.addQuestionResponse(q, 1) );

	assertCatch(RangeError, "'-?\\d+' is out of range \\(0,\\d+\\)", () => AnsQController.addQuestionResponse(q, 0) );
	assertCatch(RangeError, "'-?\\d+' is out of range \\(0,\\d+\\)", () => AnsQController.addQuestionResponse(q, 16) );
	assertCatch(TypeError, "'-?\\d+\\.\\d+' is not an int", () => AnsQController.addQuestionResponse(q, 0.5) );
	assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, ) );
	assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, "string") );
}

function testCheckValidResponseFRQ() {
	let q = new Question(-1, QType.frq, "frq");

	assertEqualFunction(0, () => AnsQController.addQuestionResponse(q, "hi") );

	assertCatch(RangeError, "response is empty", () => AnsQController.addQuestionResponse(q, "") );
	assertCatch(RangeError, "'.+' is too long", () => AnsQController.addQuestionResponse(q, "hello") );
	assertCatch(TypeError, "'.+' is not 'string'", () => AnsQController.addQuestionResponse(q, ) );
	assertCatch(TypeError, "'.+' is not 'string'", () => AnsQController.addQuestionResponse(q, 1) );
}

function testCheckValidRating() {
	let q = new Question(-1, QType.frq, "frq");
	
	assertEqualFunction(0, () => AnsQController.addRating(q, 2) );

	assertEqualFunction(-2, () => AnsQController.addRating(q, -1) );
	assertEqualFunction(-2, () => AnsQController.addRating(q, 10) );
	assertEqualFunction(-3, () => AnsQController.addRating(q, 0.5) );
	assertEqualFunction(-1, () => AnsQController.addRating(q, ) );
	assertEqualFunction(-1, () => AnsQController.addRating(q, "test") );
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




testFunctions = [
	testCheckValidResponseMC,
	testCheckValidResponseAllApply,
	testCheckValidResponseFRQ,
	testAddQuestionResponse,
	testCheckValidRating
]

var failed = [];

for (i in testFunctions){
	funct = testFunctions[i];
	console.log(funct);
	try{
		funct();
		console.log("success\n")
	} catch (error) {
		console.error(error);
		console.error(error.name + " " + error.message);
		console.error(error.stack);
		console.log("fail\n")
		failed.push(funct);
		allSucceeded = false;
	}	
}
if(failed.length > 0) {
	for (i in failed) {
		funct = failed[i];
		console.error(funct.name + " Failed");
	}
} else {
	console.log("All Tests Successful!");
}
console.log(new Date().getFullTime() );
