const library = [];

function Book(author, title, numPages, read) {
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
    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;
    const authorElement = document.createElement("h3");
    authorElement.textContent = this.author;
    const pageCountElement = document.createElement("p");
    pageCountElement.textContent = `${this.numPages} pages`;
    const hasReadElement = document.createElement("p");
    hasReadElement.textContent = this.read ? "Read" : "Not read";
    newBookElement.appendChild(titleElement);
    newBookElement.appendChild(authorElement);
    newBookElement.appendChild(pageCountElement);
    newBookElement.appendChild(hasReadElement);
    newBookElement.classList.add("book");

    return newBookElement;
  };
}

function addBook() {
  const formData = new FormData(form);
  const author = formData.get("author");
  const title = formData.get("title");
  const numPages = formData.get("numPages");
  const read = formData.get("read");
  library.push(new Book(author, title, numPages, read));
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  const booksToAdd = libraryContainer.hasChildNodes()
    ? [...library.slice(libraryContainer.childNodes.length)]
    : [...library];
  for (const book of booksToAdd) {
    const bookElement = book.getHtml();
    libraryContainer.appendChild(bookElement);
  }
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

const form = document.querySelector("#newBookForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook();
  dialog.close();
  displayBooks();
});
