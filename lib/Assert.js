
class AssertError extends Error {
	/**
	 * 
	 * @param {string | undefined} message 
	 */
	constructor(message) {
		super(message);
	}
}


class Assert {

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
	 static assertEqual(expected, actual) {
		if(actual !== expected) {
			throw new AssertError("got: '" + actual + "' but expected: '" + expected + "'");
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
	 static assertReturn(expected, fun, ...args) {
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
	static assertCatch(expectedErrorType, expectedErrorMessage, fun, ...args) {
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

}

module.exports = Assert;