const bookName = document.getElementById("bookName"),
  author = document.getElementById("author"),
  pages = document.getElementById("pages"),
  bookShelf = document.querySelector(".bookShelf"),
  doc = document.documentElement,
  wrapper = document.querySelector(".wrapper"),
  popWindow = document.querySelector(".popWindow"),
  readCheckLabel = document.querySelector(".readCheckLabel"),
  checkbox = document.getElementById("readCheck");

let popupActive = false;

// theming
const currentTheme = () => {
  doc.className = "day";
};

const themeChange = (e) => {
  e.classList.toggle("switchClicked");
  doc.className === "day" ? (doc.className = "night") : (doc.classList = "day");
};

// form pop up
const formPopUp = () => {
  popupActive = true;
  doc.classList.add("noScroll");

  const blurBg = document.createElement("div");
  blurBg.classList.add("blurBg");
  blurBg.setAttribute("onclick", "closeWindow()");
  wrapper.appendChild(blurBg);

  popWindow.classList.add("display");
};

const closeWindow = () => {
  popupActive = false;
  doc.classList.remove("noScroll");
  popWindow.classList.remove("display");

  wrapper.removeChild(document.querySelector(".blurBg"));
};

doc.addEventListener("keydown", (e) => {
  if (popupActive === true) {
    e.code === "Escape" ? closeWindow() : null;
  }
});

// form inputs
const inputs = document.querySelectorAll(".textInput"),
  labels = document.querySelectorAll(".labels");

const textentered = (e) => {
  for (let i = 0; i < inputs.length; i++) {
    e.value !== "" && e.id === labels[i].htmlFor
      ? labels[i].classList.add("labelSmall")
      : labels[i].classList.remove("labelSmall");

    inputs[i].value !== ""
      ? labels[i].classList.add("labelSmall")
      : labels[i].classList.remove("labelSmall");
  }
};

// checkbox label changing ON POPUP
readCheckLabel.textContent = "Not Read";
const readClicked = () => {
  checkbox.checked === true
    ? (readCheckLabel.textContent = "Read")
    : (readCheckLabel.textContent = "Not Read");
};
// checkbox label changing ON DISPLAY
const readClickedDisplay = (e) => {
  e.checked === false
    ? (e.parentNode.children[1].textContent = "Not Read")
    : (e.parentNode.children[1].textContent = "Read");
};

// Library
let myLibrary = [];

function newBook(n, a, p, c) {
  this.addName = n;
  this.addAuthor = a;
  this.addPages = p;
  this.read = c;
  this.index = myLibrary.length;
}

// delete card
const deleteCard = (e) => {
  let i = Number(e.parentNode.getAttribute("dataindex"));
  bookShelf.removeChild(e.parentNode);
  const filter = myLibrary.filter((obj) => obj.index !== i);
  myLibrary = filter;
  console.log("updated library", myLibrary);
};

// adding book
const addBook = () => {
  let addedBook = new newBook(
    bookName.value,
    author.value,
    pages.value,
    checkbox.checked
  );

  myLibrary.push(addedBook);
  let i = myLibrary.length - 1;

  const bookDiv = document.createElement("div"),
    cardWrapper = document.createElement("div"),
    cardTitle = document.createElement("div"),
    cardAuthor = document.createElement("div"),
    cardPages = document.createElement("div"),
    cardRead = document.createElement("div"),
    cardDelete = document.createElement("div"),
    displayCheck = document.createElement("input"),
    displayLabel = document.createElement("label");

  // set card
  bookDiv.setAttribute("class", "bookCard");
  bookDiv.setAttribute("dataindex", myLibrary[i].index);
  cardWrapper.setAttribute("class", "cardWrapper");

  // card delete button
  cardDelete.setAttribute("class", "cardDelete");
  cardDelete.setAttribute("onclick", "deleteCard(this)");

  // set book info
  cardTitle.textContent = `"${myLibrary[i].addName}"`;
  cardAuthor.textContent = myLibrary[i].addAuthor;
  cardPages.textContent = myLibrary[i].addPages;
  cardDelete.textContent = "x";

  //set read or not read
  displayCheck.setAttribute("type", "checkbox");
  displayCheck.setAttribute("id", `displayCheckbox${i}`);
  displayCheck.setAttribute("onclick", "readClickedDisplay(this)");
  displayLabel.setAttribute("for", `displayCheckbox${i}`);
  displayLabel.setAttribute("class", "displayLabel");
  displayCheck.checked = myLibrary[i].read;
  myLibrary[i].read === true
    ? (displayLabel.textContent = "Read")
    : (displayLabel.textContent = "Not Read");

  // append
  bookShelf.appendChild(bookDiv);
  bookDiv.append(cardDelete, cardWrapper);
  cardWrapper.append(cardTitle, cardAuthor, cardPages, cardRead);
  cardRead.append(displayCheck, displayLabel);

  bookName.value = "";
  author.value = "";
  pages.value = "";

  for (let i = 0; i < inputs.length; i++) {
    labels[i].classList.remove("labelSmall");
  }
  closeWindow();
  console.log(myLibrary);
};

// prevent default on submit
document
  .querySelector(".submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

currentTheme();
