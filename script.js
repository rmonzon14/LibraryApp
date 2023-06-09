const libraryCollection = [
    // Default objects
    {
        title: "Attack on Titan",
        author: "Hajime Isayama",
        pages: 208,
        isRead: "true"
    }, 
    {
        title: "Harry Potter",
        author: "J. K. Rowling",
        pages: 3707,
        isRead: "false"
    },
];


// Object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Modal and add book button elements
const addBookBtn = document.getElementsByClassName("add-book-btn")[0];
const modal = document.getElementsByClassName("modal")[0];

// Displays the modal if clicked
addBookBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Closes the modal if clicked
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

window.addEventListener("load", () => {
    if (libraryCollection.length == 0) {
        displayEmptyMessage();
    }
});


// Form elements
const form = document.getElementById("book-input-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const isReadInput = document.getElementById("isRead-input");
const errorMessage = document.getElementsByClassName("error-message");

// Displays error messages if theres one.
function setError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
}

// Validates the form
function validateForm() {
    let error = false;

    if (titleInput.value === "" || titleInput.value === null) {
        error = true;
        setError("title-error", "*The title is required!");
    } else {
        setError("title-error", "");
    }

    if (authorInput.value === "" || authorInput.value === null ) {
        error = true;
        setError("author-error", "*The author is required!");
    } else {
        setError("author-error", "");
    }

    if (pagesInput.value === "" || pagesInput.value == null) {
        error = true;
        setError("pages-error", "*The page number is required!");
    } else {
        setError("pages-error", "");
    }

    if (isReadInput.checked) {
        isReadInput.value = true;
    } else {
        isReadInput.value = false;
    }

    return error;
}

// Form event listener.
form.addEventListener("submit", e => {
    e.preventDefault();
    
    if (!validateForm()) {
        addBook();
        modal.style.display = "none";
        renderLibrary();
        form.reset();
    }
});

// Adds book to the collection.
function addBook() {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value);
    libraryCollection.push(newBook);
}

// Book section element
const bookSection = document.getElementsByClassName("book-section")[0];

// Displays the books in the library collection. 
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

        const bookConditionBtn = document.createElement("button");
        bookConditionBtn.classList.add("book-condition-btn");
       
        if (book.isRead === "true") {
            bookConditionBtn.textContent = "Unread";
            toggleBookStyle(bookCard, "grey");
        } else {
            bookConditionBtn.textContent = "Read";
            toggleBookStyle(bookCard, "black");
        }

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.setAttribute("book-data", `${i}`);
        removeBtn.classList.add("remove-btn");
        
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);
        bookCard.appendChild(removeBtn);
        bookCard.insertBefore(bookConditionBtn, removeBtn);

        bookSection.appendChild(bookCard);
    });
}

// Handles the remove book button
function handleRemoveBook() {
    const removeBtn = document.getElementsByClassName("remove-btn");
    for(let button of removeBtn) {
        button.addEventListener("click", e =>{
            removeBook(e.target.getAttribute("book-data"));   
        });
    }
}

// Removes the book from the library
function removeBook(bookData) {
    const bookCard = document.getElementsByClassName("book-card");
    for (let book of bookCard) {
        if (bookData == book.getAttribute("book-data")) {
            
            if (libraryCollection.length > 1) {
                libraryCollection.splice(bookData, 1);
            } else if (libraryCollection.length == 1) {
                libraryCollection.pop(); 
                displayEmptyMessage(); 
            }
            book.remove();
        }
    }
}

// Displays the empty message if the library collection is empty. 
function displayEmptyMessage() {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty");
    emptyMessage.textContent = "Ooops... looks like you have an empty library"

    bookSection.appendChild(emptyMessage);   
}

// Updates the book condition display and the isRead property in the library collection
function updateBookCondition() {
    let bookConditionBtn = document.getElementsByClassName("book-condition-btn");
    bookConditionBtn = Array.from(bookConditionBtn);

    bookConditionBtn.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            
            if (btn.textContent === "Read") {
                btn.textContent = "Unread";
                toggleBookStyle(e.target, "grey");

                libraryCollection.forEach((book, j) => {
                    if (i == j) {
                        book.isRead = "true";
                    }
                });
            } else  {
                btn.textContent = "Read";
                toggleBookStyle(e.target, "black");

                libraryCollection.forEach((book, j) => {
                    if (i == j) {
                        book.isRead = "false";
                    };
                });
            }
        });
    })   
}

// Toggles the book card style
function toggleBookStyle(element, color) {
    if (element.nodeName === "BUTTON") {
        const parentBookCard = element.parentNode;
        parentBookCard.setAttribute("style", `color: ${color}`);
    } else {
        element.style.color = color;
    }
}

// Displays the library collection depending on the conditions.
function renderLibrary() {
    bookSection.innerHTML = "";
        displayBook();
        handleRemoveBook();
        updateBookCondition();
}

renderLibrary();



