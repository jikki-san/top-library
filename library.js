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

function addBook(author, title, numPages, read) {
  library.push(new Book(author, title, numPages, read));
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  for (const book of library) {
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

addBook("Brandon Sanderson", "Wind and Truth", 1_000_000, true);
addBook("Brandon Sanderson", "Mistborn: The Final Empire", 430, true);
addBook("James S. A. Corey", "Leviathan's Fall", 854, false);
displayBooks();

const newBookButton = document.querySelector("#newBookModalBtn");
newBookButton.addEventListener("click", openNewBookModal);

// TODO: Add event handlers on modal close/cancel buttons
// TODO: Add event handler for submitting form and adding a book
