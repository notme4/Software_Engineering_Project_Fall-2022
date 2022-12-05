const topicTemplate = document.querySelector("[data-topic-template]")
const topicCardContainer = document.querySelector("[data-topic-cards-container]")
const searchInput = document.querySelector("[data-search]")

let topics = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    topics.forEach(question => {
        const isVisible = question.name.toLowerCase().includes(value)
        question.element.classList.toggle("hide", !isVisible)
    })
}) 

fetch("./DB/searchingDatabase.json")
.then(res => res.json())
.then(data => {
    topics = data.map(question => {
        const topicCard = topicTemplate.content.cloneNode(true).children[0]
        const name = topicCard.querySelector("[data-topicName]")
        //document.getElementsByClassName(topics.topicName).innerHTML=
        name.innerHTML = "<a href=" + question.url + ">" + question.topic + "</a>"
        
        topicCardContainer.append(topicCard)
        return{ name: question.topic, link: question.url, element: topicCard }
    })
})
   



