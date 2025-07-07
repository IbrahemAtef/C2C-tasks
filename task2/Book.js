class LibraryItem {
  #id;
  #title;
  static counter = 1;

  constructor(title) {
    this.#title = title;
    this.#id = LibraryItem.counter++;
  }

  get title() {
    return this.#title;
  }

  get id() {
    return this.#id;
  }

  displayInfo() {
    return `ID: ${this.id} | Title: ${this.title}`;
  }

  static isLibraryItem(obj) {
    return obj instanceof LibraryItem;
  }
}

class Book extends LibraryItem {
  #author;
  #pages;
  #isRead;

  constructor(title, author, pages, isRead = false) {
    super(title);
    this.#author = author;
    this.#pages = pages;
    this.#isRead = isRead;
  }

  toggleReadStatus() {
    this.#isRead = !this.#isRead;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  displayInfo() {
    return `${super.displayInfo()} | Author: ${this.author} | Pages: ${
      this.pages
    } | is read: ${this.#isRead ? "Read" : "Unread"}`;
  }
}

// 🔹 Example Usage
const book1 = new Book("book1", "Ahmed", 100);
const book2 = new Book("book2", "Salem", 200);

book1.toggleReadStatus();
console.log(book1.displayInfo());

console.log(book2.displayInfo());

console.log(LibraryItem.isLibraryItem(book1));
console.log(LibraryItem.isLibraryItem({}));
