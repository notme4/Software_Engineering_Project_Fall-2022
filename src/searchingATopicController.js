const topicTemplate = document.querySelector("[data-topic-template]")
const topicCardContainer = document.querySelector("[data-topic-cards-container]")
const searchInput = document.querySelector("[data-search]")

let topics = []

searchInput.addEventListener("search", e => {
    const value = e.target.value.toLowerCase()
    topics.forEach(question => {
        const isVisible = question.topic.toLowerCase().includes(value)
        question.element.classList.toggle("hide", !isVisible)
    })
}) 

fetch("./database.json")
.then(res => res.json())
.then(data => {
    topics = data.map(question => {
        const topicCard = topicTemplate.content.cloneNode(true).children[0]
        const name = topicCard.querySelector("[data-topicName]")
        name.textContent = question.topic
        topicCardContainer.append(topicCard)
        return{ name: question.topic, element: topicCard }
    })
})
   



