const AnsQController = require("../src/AnsweringAQuestionController");
const Question = require("../src/Question");
const { QType } = require("../src/Question");
const { assertCatch, assertReturn } = require("../lib/Assert");

class AnsweringAQuestionControllerTest {
	
	static testAddQuestionResponse() {
		let q = new Question(-1, "type", "invalid", [0, 1, 2, 3]);

		assertCatch(TypeError, "'.*'is not a valid type", () => AnsQController.addQuestionResponse(q, 0) );

		/*
		testCheckValidResponseMC();
		testCheckValidResponseAllApply();
		testCheckValidResponseFRQ();
		*/
	}

	static testCheckValidResponseMC() {
		let q = new Question(-1, QType.mc, "mcq", [0, 1, 2, 3]);

		assertReturn(0, () => AnsQController.addQuestionResponse(q, 1) );

		assertCatch(RangeError, "'-?\\d+' is out of range \\[0,\\d+\\]", () => AnsQController.addQuestionResponse(q, -1) );
		assertCatch(RangeError, "'-?\\d+' is out of range \\[0,\\d+\\]", () => AnsQController.addQuestionResponse(q, 16) );
		assertCatch(TypeError, "'-?\\d+\\.\\d+' is not an int", () => AnsQController.addQuestionResponse(q, 0.5) );
		assertCatch(TypeError, "'.+' is not 'number'" , () => AnsQController.addQuestionResponse(q, ) );
		assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, "string") );
	}

	static testCheckValidResponseAllApply() {
		let q = new Question(-1, QType.all_apply, "all_apply", [0, 1, 2, 3]);

		assertReturn(0, () => AnsQController.addQuestionResponse(q, 1) );

		assertCatch(RangeError, "'-?\\d+' is out of range \\(0,\\d+\\)", () => AnsQController.addQuestionResponse(q, 0) );
		assertCatch(RangeError, "'-?\\d+' is out of range \\(0,\\d+\\)", () => AnsQController.addQuestionResponse(q, 16) );
		assertCatch(TypeError, "'-?\\d+\\.\\d+' is not an int", () => AnsQController.addQuestionResponse(q, 0.5) );
		assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, ) );
		assertCatch(TypeError, "'.+' is not 'number'", () => AnsQController.addQuestionResponse(q, "string") );
	}

	static testCheckValidResponseFRQ() {
		let q = new Question(-1, QType.frq, "frq");

		assertReturn(0, () => AnsQController.addQuestionResponse(q, "hi") );

		assertCatch(RangeError, "response is empty", () => AnsQController.addQuestionResponse(q, "") );
		assertCatch(RangeError, "'.+' is too long", () => AnsQController.addQuestionResponse(q, "hello") );
		assertCatch(TypeError, "'.+' is not 'string'", () => AnsQController.addQuestionResponse(q, ) );
		assertCatch(TypeError, "'.+' is not 'string'", () => AnsQController.addQuestionResponse(q, 1) );
	}	

	static testCheckValidRating() {
		let q = new Question(-1, QType.frq, "frq");

		assertReturn(0, () => AnsQController.addRating(q, 2) );

		assertReturn(-2, () => AnsQController.addRating(q, -1) );
		assertReturn(-2, () => AnsQController.addRating(q, 10) );
		assertReturn(-3, () => AnsQController.addRating(q, 0.5) );
		assertReturn(-1, () => AnsQController.addRating(q, ) );
		assertReturn(-1, () => AnsQController.addRating(q, "test") );
	}
}

module.exports = AnsweringAQuestionControllerTest;
