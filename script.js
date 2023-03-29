const libraryCollection = [
    {
        title: "Harry Potter",
        author: "J. K. Rowling",    
        pages: 347,
        isRead: true
    },
    {
        title: "Harry Potter",
        author: "J. K. Rowling",    
        pages: 347,
        isRead: true
    } 
]


function Book() {

}

function addBook() {

}

function displayBook() {
    const bookSection = document.getElementsByClassName("book-section")[0];

    libraryCollection.forEach((book, i) => {

        const bookCard = document.createElement("div");
        bookCard.setAttribute("book-data", `${i}`);

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;

        const bookCondition = document.createElement("p");
        bookCondition.textContent = book.isRead;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("book-data", `${i}`);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookCondition);
        bookCard.appendChild(removeBtn);

        bookSection.appendChild(bookCard);
    });
}

displayBook();

