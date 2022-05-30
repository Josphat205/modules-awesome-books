export default class BookCollection {
  constructor(title, author, booksStore) {
    this.title = title;
    this.author = author;
    this.booksStore = booksStore;
  }

  existingData() {
    const bookList = document.querySelector('.book-list');
    // getting existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem('data'));
    if (existingData == null) existingData = this.booksStore;

    // adding existingData to booksStore
    this.booksStore = this.booksStore.concat(existingData);

    // displaying data in the ui
    this.booksStore.forEach((item) => {
      bookList.innerHTML += `
       <li class="book" id ="${item.title}">
       <p>"${item.title}" <span>By</span> <span> ${item.author}</span></p>
       <button type="button" class="remove">Remove</button>
      </li>
   `;
    });
  }

  saveData() {
    const bookList = document.querySelector('.book-list');
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { title } = this;
      const { author } = this;

      const bookDescription = {
        title: title.value,
        author: author.value,
      };
      // setting the inputValue to empty
      // console.log(this.title.value , this.author.value);
      // add new book
      if (title.value.length && author.value.length > 0) {
        this.booksStore.push(bookDescription);
        BookCollection.addMessage('Book Added successfully', 'success');
        localStorage.setItem('data', JSON.stringify(this.booksStore));
        const lastBook = this.booksStore[this.booksStore.length - 1];
        bookList.innerHTML += `
        <li class="book" id ="${lastBook.title}">
              <p>"${lastBook.title}" <span>By </span> <span> ${lastBook.author}</span></p>
              <button type="button" class="remove">Remove</button>
         </li>
        `;
      } else {
        BookCollection.addMessage('please fill all fields', 'danger');
      }
      title.value = '';
      author.value = '';
    });
  }

  removeData() {
    document.querySelector('.book-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
        const { id } = e.path[1];
        for (let a = 0; a < this.booksStore.length; a += 1) {
          if (this.booksStore[a].title === id) {
            this.booksStore.splice(a, 1);
            BookCollection.alertMessage('Book removed', 'success');
            localStorage.setItem('data', JSON.stringify(this.booksStore));
          }
        }
      }
    });
  }

  static alertMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const cont = document.querySelector('#container1');
    const list = document.querySelector('.book-list');
    cont.insertBefore(div, list);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static addMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const cont = document.querySelector('#container2');
    const form = document.querySelector('#form');
    cont.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }
}
