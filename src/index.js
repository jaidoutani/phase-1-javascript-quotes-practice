const quoteList = document.getElementById("quote-list")
const newQuoteForm = document.getElementById("new-quote-form")
const likeBtn = document.getElementsByClassName("btn-success")
const deleteBtn = document.getElementsByClassName("btn-danger")
const submitBtn = document.getElementsByClassName("btn btn-primary")

document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes()
    newQuoteForm.addEventListener("submit", (e) => {
        e.preventDefault()
        processDOM(addQuoteCard)
        // console.log()
        newQuoteForm.reset()
    })

})
function fetchQuotes() {
return fetch("http://localhost:3000/quotes?_embed=likes")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((quoteData) => {
            // console.log(quoteData)
            processDOM(quoteData)
        })
    })
}
function processDOM(quoteData) {
quoteList.innerHTML += 
    `<li class='quote-card'>
        <blockquote class="blockquote">
            <p class="mb-0">${quoteData.quote}</p>
            <footer class="blockquote-footer">${quoteData.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
    </li>
    `
    for(let btn of likeBtn){
        btn.addEventListener("click", addLikes)
    }
    for(let btn of deleteBtn){
        btn.addEventListener("click", handleDelete)
    }
}
function handleDelete(e) {
    e.target.parentNode.remove()
}
function addQuoteCard(quote) {
    let liTag = document.createElement("li")
    liTag.className = "quote-card"
    liTag.innerText = quote
    quoteList.appendChild(liTag)
}
function addLikes(e) {
    let spans = document.getElementsByTagName("span");
    for(i = 0; i < spans.length; i++) {
        if (spans === 0) {
            e.target.spans++
        }
    }
}