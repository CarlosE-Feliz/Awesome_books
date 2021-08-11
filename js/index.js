/* eslint-disable max-classes-per-file */
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('.add');
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const bookListWrap = document.querySelector('.book-ul');

  let removeBtn = [];

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class Collection {
    booksCollection = {
      books: [],
    }

    // IMPLEMENT BOOKS
    implementBooks = () => {
      bookListWrap.innerHTML = '';
      this.booksCollection.books.forEach((book, index) => {
        bookListWrap.innerHTML += `<li class = "d-flex book-list row-11">
            <div class="book-info col-7">
              <p><span class="book-title">"${book.title}"</span> by <span class="book-author">${book.author}</span></p>
            </div>
            <button type="button" class="removeBtn" data-key=${index}>Remove</button>
          </li>`;
      });
    }

    // GET BOOKS FROM LOCAL STORAGE
    getBooksFromLocalStorage = () => {
      if (JSON.parse(localStorage.getItem('bookCollection'))) {
        this.booksCollection = JSON.parse(localStorage.getItem('bookCollection'));
      }
    }

    // UPDATE LOCAL STORE
    updateLocalStorage = () => {
      localStorage.setItem('bookCollection', JSON.stringify(this.booksCollection));
    }

    // ADD BOOK
    addBook = (e) => {
      if (bookTitle.value.length <= 2 || bookAuthor.value.length <= 2) {
        e.preventDefault();
      } else {
        this.booksCollection.books.push(new Book(bookTitle.value, bookAuthor.value));
        this.updateLocalStorage();
      }
    }

    // Remove the book
    removeBook = (btn) => {
      let { books } = this.booksCollection;
      books = books.filter((book, i) => i !== Number(btn.dataset.key));
      this.booksCollection.books = books;
      this.updateLocalStorage();
      this.getBooksFromLocalStorage();
      this.implementBooks();
      removeBtn = [...document.querySelectorAll('.removeBtn')];
      removeBtn.forEach((button) => button.addEventListener('click', () => this.removeBook(button)));
    }
  }

  const collection = new Collection();
  collection.getBooksFromLocalStorage();
  if (document.querySelector('.book-ul')) {
    collection.implementBooks();
  }

  removeBtn = [...document.querySelectorAll('.removeBtn')];
  if (document.querySelector('.add')) {
    addBtn.addEventListener('click', () => collection.addBook());
  }

  removeBtn.forEach((button) => button.addEventListener('click', () => {
    collection.removeBook(button);
  }));
});
