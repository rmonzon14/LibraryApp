const libraryCollection = [
    {
        title: "Harry Potter",
        author: "J. K. Rowling",    
        pages: 347,
        isRead: true
    },
    {
        title: "dawdawdaw",
        author: "J. K. Rowling",    
        pages: 347,
        isRead: true
    },
]

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBook() {

}

function displayBook() {
    const bookSection = document.getElementsByClassName("book-section")[0];

    libraryCollection.forEach((book, i) => {

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("book-data", `${i}`);

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = book.author;

        const pages = document.createElement("p");
        pages.textContent = book.pages;

        const isRead = document.createElement("p");
        isRead.textContent = book.isRead;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("book-data", `${i}`);
        removeBtn.classList.add("remove-btn");

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);
        bookCard.appendChild(removeBtn);

        bookSection.appendChild(bookCard);
    });
}

displayBook();

const removeBtn = document.getElementsByClassName("remove-btn");

for(let button of removeBtn) {
    button.addEventListener("click", e =>{
        removeBook(e.target.getAttribute("book-data"));        
    });
}

function removeBook(bookData) {
    const bookCard = document.getElementsByClassName("book-card");
    for (let book of bookCard) {
        if (bookData == book.getAttribute("book-data")) {
            libraryCollection.splice(bookData, 1);
            book.remove();
        }
    }
}
