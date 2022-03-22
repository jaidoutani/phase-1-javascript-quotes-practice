document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes()
})
function fetchQuotes() {
fetch("http://localhost:3000/quotes?_embed=likes")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((quoteData) => {
            processDOM(quoteData)
        })
    })
}
function processDOM(quoteData) {
let quoteList = document.getElementById("quote-list")
quoteList.innerHTML = 
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
}