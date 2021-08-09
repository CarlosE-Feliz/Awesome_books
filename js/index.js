const addBtn = document.querySelector('.add');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');



const bookListWrap = document.querySelector('.book-ul');


let bookCollection = {
    books: []
};

// GET BOOK COLLECTION FROM LOCALSTORAGE
function getBooksFromLocalStorage() {
    if (JSON.parse(localStorage.getItem('bookCollection'))) {
        bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
        for (let i = 0; i < bookCollection.books.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = '<div class="book-info">'
            + '<p>'
            + `<span class="book-title">${bookCollection[i]}</span> by`
            + `<span class="book-author">${bookCollection[i]}</span>`
            +'</p>'
            +'</div>'
            + '<button type="button" id="removeButton">Remove</button>';
            bookListWrap.appendChild(li);
            console.log(bookCollection.books)
        }
    }
}
getBooksFromLocalStorage();
// IMPLEMENT BOOKS
// ADD BOOK
function addBook(e) {
    bookCollection.books.push({ title: bookTitle.value, author: bookAuthor.value });
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
}


if (document.querySelector('.add')) {
    addBtn.addEventListener('click', (e) => addBook(e));
}

