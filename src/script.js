const myLibrary = [];

//modal configuration
const closeModal = document.querySelector("#close-btn");
const modalForm = document.querySelector(".modal");
const openModal = document.querySelector("#add-btn");
const overlay = document.querySelector(".overlay");

//open and close modal
openModal.addEventListener("click", () => {
  modalForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modalForm.classList.add("hidden");
  overlay.classList.add("hidden");
});

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

//han

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
