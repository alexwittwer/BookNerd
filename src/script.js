const myLibrary = [];

//modal configuration
const closeModal = document.querySelector("#close-btn");
const modalForm = document.querySelector(".modal");
const openModal = document.querySelector("#add-btn");
const overlay = document.querySelector(".overlay");
const shelfCurrentBook = document.querySelector("#addToShelf");
const bookshelfCtn = document.querySelector("#bookshelf");

//modal content pointers
const mtitle = document.querySelector("#mtitle");
const mauthor = document.querySelector("#mauthor");
const mpages = document.querySelector("#mpages");
const mread = document.querySelector("#mread");

//open and close modal
openModal.addEventListener("click", () => {
  openMdl();
});

closeModal.addEventListener("click", () => {
  closeMdl();
});

shelfCurrentBook.addEventListener("click", (e) => {
  e.preventDefault();
  shelfDefault();
  console.table(myLibrary);
});

//
//
//
/* Function den */

//close modal
function closeMdl() {
  modalForm.classList.add("hidden");
  overlay.classList.add("hidden");
}

//open modal
function openMdl() {
  modalForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//function for creation of elements (because lazy)
function mkelem(element, parent, className, paramtext) {
  let elem = document.createElement(element);
  if (paramtext) {
    elem.textContent = paramtext;
  }
  elem.setAttribute("class", className);
  return parent.appendChild(elem);
}

//update bookshelf with current books
function updateBookshelf(arr) {
  clearLibrary();
  arr.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    for (const props in element) {
      mkelem("div", card, "default", `${props}: ${element[props]}`);
    }
    bookshelfCtn.appendChild(card);
  });
  return;
}

//clears all child elements
function clearLibrary() {
  const nodelist = document.querySelectorAll(".card");
  nodelist.forEach((element) => {
    element.remove();
  });
}

//clear inputs for modal
function clearInputs() {
  mtitle.value = "";
  mauthor.value = "";
  mpages.value = "";
}

// Constructor function for library
function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Read = read;
}

// adds a book to the library
function shelfBook() {
  chRead();
  const newBook = new Book(
    mtitle.value,
    mauthor.value,
    mpages.value,
    mread.checked
  );
  return myLibrary.push(newBook);
}

// remove book
function rmBook(name) {
  myLibrary.forEach((element) => {
    if (element.title === name) {
      myLibrary.splice(element, 1);
    }
  });
  return myLibrary;
}

//change mread to boolean value
function chRead() {}

// set status to read
function readBook(selectedBook) {
  selectedBook.read = true;
}

// set status to unread
function unreadBook(selectedBook) {
  selectedBook.read = false;
}

function shelfDefault() {
  shelfBook();
  closeMdl();
  clearInputs();
  updateBookshelf(myLibrary);
}
