const myLibrary = [];

//function for creation of elements (because lazy)

function mkelem(element, parent, className, paramtext) {
  const pointer = document.querySelector(parent);
  let elem = document.createElement(element);
  if (paramtext) {
    elem.textContent = paramtext;
  }
  elem.setAttribute("class", className);
  return pointer.appendChild(elem);
}

// Constructor function for library

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.read
      ? `${this.title} by ${this.author}, ${this.pages} pages, read`
      : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
  };
}

// adds a book to the library

function addBook() {
  const newBook = new Book();
  newBook.title = prompt("enter title");
  newBook.author = prompt("enter author");
  newBook.pages = prompt("enter pages");
  newBook.read = prompt("read? true or false");
  return newBook;
}

function rmBook(name) {
  myLibrary.forEach((element) => {
    if (element.title === name) {
      myLibrary.splice(element, 1);
    }
  });
  return myLibrary;
}

const testbook = addBook();
const alsotestbook = addBook();
const lotr = addBook();
myLibrary.push(lotr);
myLibrary.push(alsotestbook);
myLibrary.push(testbook);
