const myLibrary = [];

//modal configuration
const closeModal = document.querySelector("#close-btn");
const modalForm = document.querySelector(".modal");
const openModal = document.querySelector("#add-btn");
const overlay = document.querySelector(".overlay");
const shelfCurrentBook = document.querySelector(".modal-form");
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
shelfCurrentBook.addEventListener("submit", (e) => {
  e.preventDefault();
  shelfDefault();
});

//change book's read status

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
    //hacky way to toggle read. we delete the last child to make it so read status won't need to be updated with
    //library update call, and instead rely on the color changing. instead, we just add a blank div with the "Read" text content
    //might come back to this, probably wont. dealing with the checkbox is painful enough
    card.lastChild.remove();
    mkelem("span", card, "read-text", "Read:");

    //make slider and delete buttons
    const span = mkspan();
    const label = mklabel();
    const checkbox = mkslider();
    const swtch = mkswtch();
    const deleteBtn = mkdel();

    //add for and id
    label.setAttribute("for", element.Title);
    checkbox.id = element.Title;

    //assign divs for slider
    label.appendChild(checkbox);
    label.appendChild(span);
    swtch.appendChild(label);
    card.appendChild(swtch);
    card.appendChild(deleteBtn);
    card.classList.add("card");

    //add event listener to checkbox
    checkbox.addEventListener("change", (e) => {
      element.Read = !element.Read;
      changeCardIfRead(card, element);
    });

    //if read is true, set checkbox to on state
    if (element.Read) {
      checkbox.checked = true;
    }

    //add event listener to delete button

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      rmBook(element.Title);
    });

    bookshelfCtn.appendChild(card);
    changeCardIfRead(card, element);
  });

  return;
}

//change card color based on read status

function changeCardIfRead(card, element) {
  if (element.Read) {
    card.classList.add("read");
  } else {
    card.classList.remove("read");
  }
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
class Book {
  // calls constructor
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
  }
}

// adds a book to the library
function shelfBook() {
  //check for duplicate book on shelf
  if (!checkDupe(mtitle.value)) {
    alert("Error: book already exists on shelf");
    return;
  }
  const newBook = new Book(
    mtitle.value,
    mauthor.value,
    mpages.value,
    mread.checked
  );
  return myLibrary.push(newBook);
}

function changeRead() {}

//check for duplicate (return false if a book exists)
function checkDupe(inputTitle) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (inputTitle === myLibrary[i].Title) {
      return false;
    }
  }
  return true;
}

// remove book
function rmBook(name) {
  myLibrary.forEach((element, index) => {
    if (element.Title === name) {
      myLibrary.splice(index, 1);
    }
  });
  updateBookshelf(myLibrary);
  return myLibrary;
}

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
