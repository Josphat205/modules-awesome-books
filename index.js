import BookCollection from './modules/classModule.js';
import { currentDate, pageSwitcher } from './modules/switcher.js';

const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const date = document.querySelector('#date');
const booksStore = [];

// instatiate
const Book1 = new BookCollection(bookTitle, bookAuthor, booksStore);
Book1.saveData();
Book1.removeData();
Book1.existingData();

pageSwitcher();

date.textContent = currentDate();
