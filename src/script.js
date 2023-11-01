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

// stores books in array

const myLibrary = [];

// adds a book to the library

function addBook() {
  const addBook = new Book();
  addBook.title = prompt("enter title");
  addBook.author = prompt("enter author");
  addBook.pages = prompt("enter pages");
  addBook.read = prompt("read? true or false");
  console.log(addBook.info());

  myLibrary.push(addBook);
  return addBook;
}

addBook();
