const libraryCollection = [
    {
        title: "Attack on Titan",
        author: "Hajime Isayama",
        pages: 208,
        isRead: "You have read this book"
    }, 
    {
        title: "Harry Potter",
        author: "J. K. Rowling",
        pages: 3707,
        isRead: "You have not read this book"
    },
];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const form = document.getElementById("book-input-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const isReadInput = document.getElementById("isRead-input");
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
        isReadInput.value = "You have read this book";
    } else {
        isReadInput.value = "You have not read this book";
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
const cardInfo = document.getElementById


function displayBook() {
    libraryCollection.forEach((book, i) => {

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("book-data", `${i}`);

        const title = document.createElement("h3");
        title.classList.add("book-title");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.classList.add("book-author");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.classList.add("book-pages");
        pages.textContent = `Page Count: ${book.pages}`;

        const isRead = document.createElement("p");
        isRead.classList.add("book-isRead");
        isRead.textContent = book.isRead;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("book-data", `${i}`);
        removeBtn.classList.add("remove-btn");

        const bookConditionLabel = document.createElement("label");
        bookConditionLabel.setAttribute("for", "book-condition");
        bookConditionLabel.textContent = "Mark as read";

        const bookConditionCheckbox = document.createElement("input");
        bookConditionCheckbox.type = "checkbox";
        bookConditionCheckbox.classList.add("book-condition");
        bookConditionCheckbox.name = "book-condition";
        
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);
        bookCard.appendChild(removeBtn);
        bookCard.insertBefore(bookConditionCheckbox, removeBtn);

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