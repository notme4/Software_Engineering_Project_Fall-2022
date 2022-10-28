import Question from "./Question.js";
//import Ans_Q_GUI from "./Answering_A_Question_GUI.js";
import Ans_Q_Controller from "./Answering_A_Question_Controller.js";

test_check_valid_response_mc();
test_check_valid_response_all_apply();
test_check_valid_response_frq();
test_check_valid_response();
test_check_valid_rating();

/**
 * Asserts that actual is === to expected
 * 
 * @author: Connor Funk
 * 
 * @param {*} expected - the expected value
 * @param {*} actual - the actual value
 * 
 * @throws {AssertError} when assertion is false
 */
function assert_equals(expected, actual) {
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
 * @author: Connor Funk
 * 
 * @param {*} expected - the expected return of fun
 * @param {function} fun - the function to be called
 * @param  {...any} args - the arguments to be passed to fun
 * 
 * @throws {AssertError} when assertion is false
 */
function assert_equals_fun(expected, fun, ...args) {
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
 * @author: Connor Funk
 * 
 * @param {regex} expected - the regex of the exception expected to be thrown by fun
 * @param {function} fun - the function to be called
 * @param {...any} args - the arguments to be passed to fun
 * 
 * @throws {AssertError} when assertion is false
 */
function assert_catch(expected, fun, ...args) {
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

function test_check_valid_response() {
	let q = new Question(-1, "type", "invalid", [0, 1, 2, 3]);
	let controller = new Ans_Q_Controller(q);

	assert_catch("question is not a valid type: '.*'", () => controller.check_valid_response(0) );

	test_check_valid_response_mc();
	test_check_valid_response_all_apply();
	test_check_valid_response_frq();
}

function test_check_valid_response_mc() {
	let q = new Question(-1, Question.Q_type.mc, "mcq", [0, 1, 2, 3]);
	let controller = new Ans_Q_Controller(q);

	assert_equals_fun(0, () => controller.check_valid_response(1) );

	assert_catch("RangeError: '-?\\d+' is out of range \\[0,\\d+\\]", () => controller.check_valid_response(-1) );
	assert_catch("RangeError: '-?\\d+' is out of range \\[0,\\d+\\]", () => controller.check_valid_response(16) );
	assert_catch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.check_valid_response(0.5) );
	assert_catch("TypeError: '.+' is not 'number'" , () => controller.check_valid_response() );
	assert_catch("TypeError: '.+' is not 'number'", () => controller.check_valid_response("string") );
}

function test_check_valid_response_all_apply() {
	let q = new Question(-1, Question.Q_type.all_apply, "all_apply", [0, 1, 2, 3]);
	let controller = new Ans_Q_Controller(q);

	assert_equals_fun(0, () => controller.check_valid_response_all_apply(1) );

	assert_catch("RangeError: '-?\\d+' is out of range \\(0,\\d+\\)", () => controller.check_valid_response(0) );
	assert_catch("RangeError: '-?\\d+' is out of range \\(0,\\d+\\)", () => controller.check_valid_response(16) );
	assert_catch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.check_valid_response(0.5) );
	assert_catch("TypeError: '.+' is not 'number'", () => controller.check_valid_response() );
	assert_catch("TypeError: '.+' is not 'number'", () => controller.check_valid_response("string") );
}

function test_check_valid_response_frq() {
	let q = new Question(-1, Question.Q_type.frq, "frq");
	let controller = new Ans_Q_Controller(q);

	assert_equals_fun(0, () => controller.check_valid_response_frq("hi") );

	assert_catch("RangeError: response is empty", () => controller.check_valid_response("") );
	assert_catch("RangeError: '.+' is too long", () => controller.check_valid_response("hello") );
	assert_catch("TypeError: '.+' is not 'string'", () => controller.check_valid_response() );
	assert_catch("TypeError: '.+' is not 'string'", () => controller.check_valid_response(1) );
}

function test_check_valid_rating() {
	let q = new Question(-1, Question.Q_type.frq, "frq");
	let controller = new Ans_Q_Controller(q);
	
	assert_equals_fun(0, () => controller.check_valid_rating(2) );

	assert_catch("RangeError: '-?\\d+' is out of range \\[0,9\\]", () => controller.check_valid_rating(-1) );
	assert_catch("RangeError: '-?\\d+' is out of range \\[0,9\\]", () => controller.check_valid_rating(10) );
	assert_catch("TypeError: '-?\\d+\\.\\d+' is not an int", () => controller.check_valid_rating(0.5) );
	assert_catch("TypeError: '.*' is not 'number'", () => controller.check_valid_rating() );
	assert_catch("TypeError: '.*' is not 'number'", () => controller.check_valid_rating("test") );
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
