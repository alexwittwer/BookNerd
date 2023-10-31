//google books api
import fetch from "fetch";

async function fetchBooks(search) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyD8XTgw6x-BfOfL6LiRJGqlo4TBuiarnNM`
  );
  const result = await response.json();
  return result.items;
}

const books = await fetchBooks("search");
const searchBar = document.querySelector("#search-bar");

document.createElement("div").innerHTML(books);

// Constructor function for library

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return read
      ? `${title} by ${author}, ${pages} pages, read`
      : `${title} by ${author}, ${pages} pages, not read yet`;
  };
}
