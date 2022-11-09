require("./getFullTime.js");
const test = require(process.argv[1]);

arr = Object.getOwnPropertyDescriptors(test);

var failed = [];

for (i in arr) {
	funct = arr[i].value;
	if (typeof(funct) != 'function') {
		continue;
	}
	console.log(funct);
	try{
		funct();
		console.log("success\n")
	} catch (error) {
		//console.error(error);
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