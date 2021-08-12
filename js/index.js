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

// website with navigation

document.getElementById('list').addEventListener('click', () => {
  document.getElementById('list_').classList.remove('d-none');
  document.getElementById('contact_').classList.add('d-none');
  document.getElementById('addNew').classList.add('d-none');
});

document.getElementById('add_new').addEventListener('click', () => {
  document.getElementById('list_').classList.add('d-none');
  document.getElementById('contact_').classList.add('d-none');
  document.getElementById('addNew').classList.remove('d-none');
});

document.getElementById('contact').addEventListener('click', () => {
  document.getElementById('list_').classList.add('d-none');
  document.getElementById('contact_').classList.remove('d-none');
  document.getElementById('addNew').classList.add('d-none');
});

// time
function checkTime(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}
function startTime() {
  const today = new Date();
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  hr = (hr === 0) ? 12 : hr;
  hr = (hr > 10) ? hr + 0 : hr;
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById('clock').innerHTML = `${hr}:${min}:${sec}`;
  const months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const curWeekDay = days[today.getDay()];
  const curDay = today.getDate();
  const curMonth = months[today.getMonth()];
  const curYear = today.getFullYear();
  const date = `${curWeekDay},${curDay} ${curMonth} ${curYear}`;
  document.getElementById('date').innerHTML = date;

  // eslint-disable-next-line no-unused-vars
  const time = setTimeout(() => { startTime(); }, 500);
}

startTime();
