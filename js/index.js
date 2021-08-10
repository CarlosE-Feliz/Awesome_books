const addBtn = document.querySelector('.add');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');

const bookListWrap = document.querySelector('.book-ul');

let bookCollection = {
  books: [],
};

// GET BOOK COLLECTION FROM LOCALSTORAGE
function getBooksFromLocalStorage() {
  if (JSON.parse(localStorage.getItem('bookCollection'))) {
    bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
    for (let i = 0; i < bookCollection.books.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = '<div class="book-info">'
            + '<p>'
            + `<span class="book-title">${bookCollection.books[i].title}</span> by `
            + `<span class="book-author">${bookCollection.books[i].author}</span>`
            + '</p>'
            + '</div>'
            + '<button type="button" id="removeButton" class="delete">Remove</button>';
      bookListWrap.appendChild(li);
    }
  }
}
getBooksFromLocalStorage();

// ADD BOOK

function updateLocalStorage() {
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
}

function addBook() {
  bookCollection.books.push({ title: bookTitle.value, author: bookAuthor.value });
  updateLocalStorage();
}

if (document.querySelector('.add')) {
  addBtn.addEventListener('click', (e) => addBook(e));
}

// REMOVE BOOKS
function deleteBook(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
  }
}

document.querySelector('#list-books').addEventListener('click', (e) => {
  deleteBook(e.target);
});
