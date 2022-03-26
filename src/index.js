const quotesList = document.getElementById("quote-list")
const newQuoteForm = document.getElementById("new-quote-form")

fetch("http://localhost:3000/quotes?_embed=likes")
    .then(res => res.json())
    .then((quotesArray) => {
        quotesArray.forEach((quoteObj) => {
            processDOM(quoteObj)
        })
    })

// Add event listener to submit btn
newQuoteForm.addEventListener("submit", (e) => {
    // Prevent page from refreshing
    e.preventDefault()
    let author = e.target["author"].value
    let quoteData = e.target["new-quote"].value
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            author: author,
            quote: quoteData
        })
    })
    .then(res => res.json())
    .then((newQuote) => {
        newQuote.likes = []
        processDOM(newQuote)
    })
})

function processDOM(quoteObj) {
    // Create outermost element
    let liTag = document.createElement("li")
    liTag.className = "quote-card"
    // Fill outermost element using innerHTML
    liTag.innerHTML = 
    `<blockquote class="blockquote">
        <p class="mb-0">${quoteObj.quote}</p>
        <footer class="blockquote-footer">${quoteObj.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
    </blockquote>`
    // Append outermost element to DOM
    quotesList.append(liTag)
    // Get elements from outerelement
    let deleteBtn = liTag.querySelector(".btn-danger") 
    let likeBtn = liTag.querySelector(".btn-success")
    let likeSpan = liTag.querySelector("span")
    // Add event listeners
    deleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            liTag.remove()
        })
    })
    likeBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quoteId: quoteObj.id
            })
        })
        .then((res) => res.json())
        .then((newLike) => {
            quoteObj.likes.push(newLike)
            likeSpan.innerText = quoteObj.likes.length
        })
    })
}
