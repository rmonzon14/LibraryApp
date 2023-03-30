const libraryCollection = [
    {
        title: "Attack on Titan",
        author: "Hajime Isayama",
        pages: 208,
        isRead: "Book has been read"
    }, 
    {
        title: "Harry Potter",
        author: "J. K. Rowling",
        pages: 3707,
        isRead: "Book has not been read"
    }
];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const form = document.getElementById("book-input-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadInput = document.getElementById("isRead");
const errorMessage = document.getElementsByClassName("error-message");

function setError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
}

function validateForm() {
    let error = false;

    if (titleInput.value === "" || titleInput.value === null) {
        error = true;
        setError("title-error", "The title is required!");
    } else {
        setError("title-error", "");
    }

    if (authorInput.value === "" || authorInput.value === null ) {
        error = true;
        setError("author-error", "The author is required!");
    } else {
        setError("author-error", "");
    }

    if (pagesInput.value === "" || pagesInput.value == null) {
        error = true;
        setError("pages-error", "The page number is required!");
    } else {
        setError("pages-error", "");
    }

    if (isReadInput.checked) {
        isReadInput.value = "Book has been read";
    } else {
        isReadInput.value = "Book has not been read";
    }

    return error;
}

form.addEventListener("submit", e => {
    e.preventDefault();
    
    if (!validateForm()) {
        addBook();
        renderLibrary();
        form.reset();
    }
});

function addBook() {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value);
    libraryCollection.push(newBook);
}

const bookSection = document.getElementsByClassName("book-section")[0];

function displayBook() {
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

function enableRemove() {
    const removeBtn = document.getElementsByClassName("remove-btn");
    for(let button of removeBtn) {
        button.addEventListener("click", e =>{
            removeBook(e.target.getAttribute("book-data"));     
        });
    }
}

function removeBook(bookData) {
    const bookCard = document.getElementsByClassName("book-card");
    for (let book of bookCard) {
        if (bookData == book.getAttribute("book-data")) {
            libraryCollection.splice(bookData, 1);
            book.remove();

            if (libraryCollection.length == 1) {
                libraryCollection.pop();
            }
        }
    }
}

function renderLibrary() {
    bookSection.innerHTML = "";
    displayBook();
    enableRemove();
}

renderLibrary();