let library = [];

function Book(author, title, numPages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this constructor");
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.read = read;
  this.print = () =>
    `${this.title} by ${this.author} (${numPages}pg, ${
      this.read ? "Read" : "Not read"
    })`;
  this.getHtml = () => {
    const newBookElement = document.createElement("div");
    newBookElement.dataset.id = this.id;
    newBookElement.classList.add("book");

    const header = document.createElement("div");
    header.classList.add("book-header");
    const body = document.createElement("div");
    body.classList.add("book-body");

    newBookElement.appendChild(header);
    newBookElement.appendChild(body);

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;
    const authorElement = document.createElement("h3");
    authorElement.textContent = this.author;
    const pageCountElement = document.createElement("p");
    pageCountElement.textContent = `${this.numPages} pages`;
    const hasReadElement = document.createElement("p");
    hasReadElement.textContent = this.read ? "Read" : "Not read";

    const deleteButton = document.createElement("img");
    deleteButton.src = "public/icons/close-circle.svg";
    deleteButton.alt = "Delete book";
    deleteButton.addEventListener("click", deleteBook);
    const readButton = document.createElement("button");
    readButton.textContent = "I've read this";
    readButton.addEventListener("click", markBookRead);

    header.appendChild(titleElement);
    header.appendChild(deleteButton);

    body.appendChild(authorElement);
    body.appendChild(pageCountElement);
    body.appendChild(hasReadElement);
    if (!this.read) {
      body.appendChild(readButton);
    }

    return newBookElement;
  };
}

Book.prototype.markRead = function () {
  this.read = true;
};

function addBook(formData) {
  const author = formData.get("author");
  const title = formData.get("title");
  const numPages = formData.get("numPages");
  const read = formData.get("read");
  library.push(new Book(author, title, numPages, read));
}

function deleteBook(event) {
  const book = event.target.parentNode.parentNode;
  const id = book.dataset.id;
  library = library.filter((book) => book.id !== id);
  displayBooks();
}

function markBookRead(event) {
  const bookCard = event.target.parentNode.parentNode;
  book = library.find((book) => book.id === bookCard.dataset.id);
  book.markRead();
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  clearShelf();
  for (const book of library) {
    const bookElement = book.getHtml();
    libraryContainer.appendChild(bookElement);
  }
}

function clearShelf() {
  const books = document.querySelector(".library");
  books.replaceChildren();
}

function openNewBookModal() {
  const dialog = document.querySelector("#newBookModal");
  dialog.showModal();
}

function closeNewBookModal() {
  const dialog = document.querySelector("#newBookModal");
  dialog.close();
}

const dialog = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookModalBtn");
newBookButton.addEventListener("click", openNewBookModal);
const cancelButton = document.querySelector("#cancelBtn");
const closeButton = document.querySelector("#closeBtn");
cancelButton.addEventListener("click", closeNewBookModal);
closeButton.addEventListener("click", closeNewBookModal);

const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(newBookForm);
  newBookForm.reset();
  addBook(formData);
  dialog.close();
  displayBooks();
});
