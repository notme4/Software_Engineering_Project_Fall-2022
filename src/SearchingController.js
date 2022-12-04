// topic1-3 are for a would-be database
let topics = [
	"What are college students' favorite cereal",
	"What are college students' favorite free-time activity?",
	"What is the most useful U.S. currency denomination?"
]
let inputTopic;
let originalTopic;
let topicArr = [];
let deleteFiller = ['what', 'is', 'are', 'the', 'who', 'when', 'where', 'how', 'do', 'your', 'a'];
class SearchingTopic{
	DatabaseManager = require("./DatabaseManager");
	topics = this.DatabaseManager.searchQuestion().map((element) => {
		return element.question
	})
	constructor() {
		originalTopic = "";
		inputTopic = "";
	}
	static search(topic) {
		originalTopic = topic;
		let tempInputTopic;
		inputTopic = topic.toLowerCase();
		topicArr = inputTopic.split(" ");
		this.keywords(topicArr);
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
		
		if (inputTopic == "") {
			console.log("Your search of " + originalTopic + " generated no results.\n");
			return;
		}
	
		console.log("Your search of: " + origintalTopic + " generated -- ");
		
		for(top in topics) {
			for (let i = 0; i < searchArr.length; i++) {
				if (top.includes(searchArr[i])) {
					contains = "true";
					break;
				}
			}
			if (contains == "true") {
				console.log(top + "\n");
				contains = "false";
			}
		}
	}
}

SearchingTopic.search("college stuff")