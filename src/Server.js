const AnsweringAQuestionController = require("../src/AnsweringAQuestionController");
const Question = require("../src/Question");
const QuestionAnswer = require("./QuestionAnswer");
const DatabaseManager = require("./DatabaseManager");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const SuggestedQuestion = require("./SuggestedQuestion");
const port = 3002;

const server = 'http://localhost:3000';
const questionPage = 'Question';
const questionPge2 = 'Question2';
const answerPage = 'AnswerQuestion'
const style = "style.css"

let question;

app.use( bodyParser.json() );		// to support JSON-encoded bodies

app.use(bodyParser.urlencoded( {	// to support URL-encoded bodies
 extended: true} ) );

app.use(cors() );

app.use(express.static(__dirname) );

DatabaseManager.initialize();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});

// load
app.get("/", (req, res) => {
	res.send(`<a href='${server}/${questionPage}'>question</a>`); 
});

app.post("/question", (req, res) => {
	qid = (typeof(req.body['qid']) != 'undefined') ? req.body['qid'] : "random";
	acctID = (typeof(req.body['acctID']) != 'undefined') ? req.body['acctID'] : "random";
	question = loadQuestion(acctID, qid);
	console.log(question)
	res.send(question)
});

app.post("/AnswerQuestion", (req, res) => {
	console.log("Answer Question: " + JSON.stringify(req.body));
	question = loadQuestion(req.body['acctID'], req.body['qid']);
	console.log(question);
	response = req.body['response'];
	AnsweringAQuestionController.addQuestionAnswer(question, req.body['acctID'], response);
	res.send({});
});

app.post("/rating", (req, res) => {
	console.log("rating: " + JSON.stringify(req.body));
	question = loadQuestion(req.body['acctID'], req.body['qid']);
	AnsweringAQuestionController.addQuestionRating(question, parseInt(req.body['rate']))
	res.send({});
});

app.get("/suggest", (req, res) => {
	console.log("rating: " + JSON.stringify(req.query));
	sq = new SuggestedQuestion(req.query.question, req.query.type, req.query.acctID);
	DatabaseManager.addSuggestedQuestion(sq);
	res.send({});
});

function loadQuestion(acctID, qid) {
	return (qid != "random") ?
		AnsweringAQuestionController.getQuestionFromQID(qid) :
		AnsweringAQuestionController.getRandomQuestion(acctID);
}