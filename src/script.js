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

//add book to library
shelfCurrentBook.addEventListener("click", (e) => {
  e.preventDefault();
  shelfDefault();
  console.table(myLibrary);
});

//remove book from library

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
    for (const props in element) {
      mkelem("div", card, "default", `${props}: ${element[props]}`);
    }

    //make slider and delete buttons
    span = mkspan();
    label = mklabel();
    checkbox = mkslider();
    swtch = mkswtch();
    deleteBtn = mkdel();

    //assign divs for slider
    label.appendChild(checkbox);
    label.appendChild(span);
    swtch.appendChild(label);
    card.appendChild(swtch);
    card.appendChild(deleteBtn);
    card.classList.add("card");

    //add event listener to delete button

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      rmBook(element.title);
    });

    bookshelfCtn.appendChild(card);
  });
  return;
}

//create divs
function mkdel() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  return deleteBtn;
}

function mklabel() {
  const label = document.createElement("label");
  label.classList.add("switch");
  label.setAttribute("for", "read");
  return label;
}

function mkspan() {
  const span = document.createElement("span");
  span.classList.add("slider");
  return span;
}

function mkslider() {
  const readSlider = document.createElement("input");
  readSlider.setAttribute("name", "read");
  readSlider.setAttribute("type", "checkbox");
  return readSlider;
}
function mkswtch() {
  const swtch = document.createElement("div");
  return swtch;
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
  updateBookshelf(myLibrary);
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
