// topic1-3 are for a would-be database
let topic1 = "What are college students' favorite cereal";
let topic2 = "What are college students' favorite free-time activity?";
let topic3 = "What is the most useful U.S. currency denomination?";
let inputTopic;
let originalTopic;
let topicArr = [];
let deleteFiller = ['what', 'is', 'are', 'the', 'who', 'when', 'where', 'how', 'do', 'your', 'a'];
class SearchingTopic{
	constructor() {
		originalTopic = "";
		inputTopic = "";
	}
	search(topic) {
		originalTopic = topic;
		inputTopic = topic.toLowerCase();
		topicArr = inputTopic.split(" ");
		this.keywords(topicArr);
		inputTopic = inputTopic.replace(/,/g, " ");
		inputTopic = inputTopic.replace(/\?/g, "");
		topicArr = inputTopic.split(" ");
		this.searchMatch(topicArr);
	}
	keywords(topicArr) {
  		let index = -1;
  		for(let i = 0; i < deleteFiller.length; i++) {
			index = topicArr.indexOf(deleteFiller[i]);
			if (index != -1) {
				searchArr.splice(index, 1);
			}
			index = -1;
		}
		inputTopic = searchArr.toString();
	}
	searchMatch(searchArr) {
		let generations = 0;
  		let contains = "false";
		let condition = "true";
		let i;
		
		for(i in searchArr) {
			searchArr[i] = "\\b" + searchArr[i] + "\\b";
		}
		
		console.log("Your search of: " + originalTopic + " generated -- ");
		for (let i = 0; i < searchArr.length && condition == true; i++) {
			if (topic1.search(searchArr[i]) != -1) {
	  			contains = true;
				condition = false;
			}
		}
		if (contains == true) {
			console.log(topic1);
			contains = false;
			condition = true;
			generations++;
		}
		for (let i = 0; i < searchArr.length && condition == true; i++) {
			if (topic2.search(searchArr[i]) != -1) {
	  			contains = true;
				condition = false;
			}
		}
		if (contains == true) {
			console.log(topic2);
			contains = false;
			condition = true;
			generations++;
		}
		for (let i = 0; i < searchArr.length && condition == true; i++) {
			if (topic3.search(searchArr[i]) != -1) {
	  			contains = true;
				condition = false;
			}
		}
		if (contains == true) {
			console.log(topic3);
			contains = false;
			condition = true;
			generations++;
		}
		if (generations == 0) {
			console.log("no results.");
		}
		else {
			console.log("You have " + generations + " result(s).");
		}
	}
}

