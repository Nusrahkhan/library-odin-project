const dialogBox = document.getElementById("dialogBox");
const addBook = document.getElementById("addBook");
const outputBox = document.querySelector("output");
const genre = dialogBox.querySelector("select");
const title = dialogBox.querySelector("#title");
const confirm = dialogBox.querySelector("#confirm");
const cardContainer = document.getElementById("cardContainer");

//"addBook" button opens the dialog modally
addBook.addEventListener("click", () => {

    title.value = "";
    genre.selectedIndex = 0;
    const readStatusRadios = dialogBox.querySelectorAll('input[name="Status"]');
    readStatusRadios.forEach(radio => {
        radio.checked = false; // Uncheck all radio buttons
    });
    dialogBox.showModal();
});


confirm.addEventListener("click", (event) => {

    const bookTitle = title.value;
    const bookGenre = genre.value;
    const bookStatus = dialogBox.querySelector('input[name="Status"]:checked');

    if (bookTitle && bookGenre !== "default") {

        const readStatus = bookStatus ? bookStatus.value : "Not Read";

        // Save the book details in the books array as an object
        myLibrary.push({ 
            title: bookTitle,
            genre: bookGenre,
            status: readStatus
        });
        
        // Call a function to update the card container
        updateCardContainer();

        // Close the dialog manually after saving the data
        dialogBox.close();
    } else {
        // Provide some feedback if the title or genre is missing
        alert("Please enter a title and select a genre.");
    }

});


function updateCardContainer() {
    cardContainer.innerHTML = "";

 myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML =`
        <h3 class = "book-number">Book ${index + 1}<h3>
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Book Status:</strong> ${book.status}</p>
        <div class = "card-buttons">
        <button 
        onclick = "deleteBook(${index})" class="delete-button">Delete</button>
        <button 
        onclick = "changeStatus(${index})" class = changing-status>Change status</button>
        </div>
        `;

        cardContainer.appendChild(card);
    });   
}

const myLibrary = [];

function deleteBook(index) {
    myLibrary.splice(index, 1);
    updateCardContainer();
}

function changeStatus(index) {
    const book = myLibrary[index];

    if (book.status == "Not Read") {
        book.status = 'Read';
    } else {
        book.status = 'Not Read';
    }
    
    updateCardContainer();
}