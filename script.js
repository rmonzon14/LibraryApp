const libraryCollection = ["Harry Potter", "Wimpy Kid"];

function Book() {

}

function addBook() {

}

function displayBook() {
    const bookTable = document.getElementsByTagName("tbody")[0];

    libraryCollection.forEach(book => {
        const bookDataRow = document.createElement("tr");
        const bookTitleData = document.createElement("td");
        
        bookTitleData.textContent = book;

        bookTable.appendChild(bookDataRow);
        bookDataRow.appendChild(bookTitleData);

    });
}

displayBook();

