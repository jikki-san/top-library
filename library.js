let myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    const readString = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
  };
  this.toHtml = function () {
    const bookCard = document.createElement("div");
    bookCard.dataset.id = this.id;
    bookCard.classList.add("book");

    const header = document.createElement("div");
    header.classList.add("book-header");
    const body = document.createElement("div");
    body.classList.add("book-body");

    bookCard.appendChild(header);
    bookCard.appendChild(body);

    const title = document.createElement("h3");
    title.textContent = this.title;
    const author = document.createElement("p");
    author.textContent = this.author;
    const pageCount = document.createElement("p");
    pageCount.textContent = `${this.pages} pgs`;
    const read = document.createElement("p");
    read.textContent = this.read ? "Read" : "Not Read";
    const deleteButton = document.createElement("img");
    deleteButton.src = "public/icons/close-circle.svg";
    deleteButton.alt = "Delete book";
    deleteButton.addEventListener("click", deleteBookFromLibrary);
    const readButton = document.createElement("button");
    readButton.textContent = "I've read this";
    readButton.addEventListener("click", markBookRead);

    header.appendChild(title);
    header.appendChild(deleteButton);
    body.appendChild(author);
    body.appendChild(pageCount);
    body.appendChild(read);
    if (!this.read) {
      body.appendChild(readButton);
    }

    return bookCard;
  };
}

Book.prototype.markRead = function () {
  this.read = true;
};

function addBookToLibrary(title, author, pages, read) {
  // check validity?
  myLibrary.push(new Book(title, author, pages, read));
}

function deleteBookFromLibrary(event) {
  const book = event.target.parentNode.parentNode;
  const id = book.dataset.id;
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayLibrary();
}

function markBookRead(event) {
  const bookCard = event.target.parentNode.parentNode;
  book = myLibrary.find((book) => book.id === bookCard.dataset.id);
  book.markRead();
  displayLibrary();
}

function displayLibrary() {
  clearShelf();
  for (const book of myLibrary) {
    const html = book.toHtml();
    appendBookHtml(html);
  }
}

function clearShelf() {
  const books = document.querySelector(".books");
  books.replaceChildren();
}

function appendBookHtml(bookHtml) {
  const books = document.querySelector(".books");
  books.appendChild(bookHtml);
}

newBookBtn = document.querySelector(".new-book");
newBookModal = document.querySelector(".new-book-modal");
closeModalBtn = document.querySelector("img#closeModal");
modalCancelBtn = document.querySelector("button.cancel");
newBookForm = document.querySelector("#newBookForm");

newBookBtn.addEventListener("click", (event) => {
  newBookModal.showModal();
});

closeModalBtn.addEventListener("click", closeModalAndResetForm);
modalCancelBtn.addEventListener("click", closeModalAndResetForm);

function closeModalAndResetForm() {
  newBookModal.close();
  newBookForm.reset();
}

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formData = new FormData(newBookForm);
  newBookForm.reset();
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pageCount");
  const read = formData.get("read");
  addBookToLibrary(title, author, pages, read);
  newBookModal.close();
  displayLibrary();
});

newBookForm.addEventListener("cancel", (event) => {
  event.preventDefault();
  newBookModal.close();
});

addBookToLibrary("A", "Pipi Pupu", 123, false);
addBookToLibrary("B", "Peepo Poopi", 234, true);
addBookToLibrary("The Hobbit", "Barbo Bilgins", 456, true);
addBookToLibrary("Toodly and the Groodly Snoodly", "Barbo Bilgins", 456, true);

displayLibrary();
