const topicTemplate = document.querySelector("[data-topic-template]")
const topicCardContainer = document.querySelector("[data-topic-cards-container]")

let topics = []

fetch("./searchingDatabase.json")
.then(res => res.json())
.then(data => {
    topics = data.map(question => {
        const topicCard = topicTemplate.content.cloneNode(true).children[0]
        const name = topicCard.querySelector("[data-topicName]")
        const answers = topicCard.querySelector("[data-answers]")
        // console.log(question.topic) debug statement
        if (question.topic == "What are college students' favorite cereal?") {
            name.textContent = question.topic
            // console.log(JSON.stringify(question)) debug
            for (let i in question["answer"]) {
                answers.textContent += "Cereal: " + question["answer"][i]["response"] + "\n" + "Favorites: " + question["answer"][i]["favorites"] + "\n\n"
            }
            // answers.textContent = question.answer
        }
        topicCardContainer.append(topicCard)
        return{ name: question.topic, answers: question.answer, element: topicCard }
    })
})