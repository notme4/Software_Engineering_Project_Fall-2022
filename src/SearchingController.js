// topic1-3 are for a would-be database
let topic1 = "What are college students' favorite cereal";
let topic2 = "What are college students' favorite free-time activity?";
let topic3 = "What is the most useful U.S. currency denomination?";
let inputTopic;
let originalTopic;
let topicArr = [];
let deleteFiller = ['what', 'is', 'are', 'the', 'who', 'when', 'where', 'how'];
class SearchingTopic{
	constructor() {
		originalTopic = "";
		inputTopic = "";
	}
	static search(topic) {
		originalTopic = topic;
		let tempInputTopic;
		inputTopic = topic.toLowerCase();
		topicArr = inputTopic.split(" ");
		keywords(topicArr);
		inputTopic = topicArr.split(",");

		topicArr = inputTopic.split(" ");
		searchMatch(topicArr);
	}
	static keywords(topicArr) {
		let index;
		for(let i = 0; i < deleteFiller.length; i++) {
			index = topicArr.indexOf(deleteFiller[i]);
			topicArr.splice(index, 1);
		}
	}
	static searchMatch(searchArr) {
		let contains = "false";
		let condition = "true";
		if (inputTopic == "") {
			console.log("Your search of " + originalTopic + " generated no results.\n");
			return;
		}
	
		console.log("Your search of: " + origintalTopic + " generated -- ");
		for (let i = 0; i < searchArr.length && condition == "true"; i++) {
			if (topic1.includes(searchArr[i])) {
				contains = "true";
				condition = "false";
			}
		}
		if (contains == "true") {
			console.log(topic1 + "\n");
			contains = "false";
			condition = "true";
		}
		for (let i = 0; i < searchArr.length && condition == "true"; i++) {
			if (topic2.includes(searchArr[i])) {
				contains = "true";
				condition = "false";
			}
		}
		if (contains == "true") {
			console.log(topic2 + "\n");
			contains = "false";
			condition = "true";
		}
		for (let i = 0; i < searchArr.length && condition == "true"; i++) {
			if (topic3.includes(searchArr[i])) {
				contains = "true";
				condition = "false";
			}
		}
		if (contains == "true") {
			console.log(topic3 + "\n");
			contains = "false";
			condition = "true";
		}
	}
}

console.log(topic1);
