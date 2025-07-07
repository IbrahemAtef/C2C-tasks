// Style 2 (Factory function)
function Book(title, author, isRead = false) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};
Book.prototype.describe = function () {
  return `${this.title} by ${this.author} is ${
    this.isRead ? "Read" : "Unread"
  }`;
};

const book1 = new Book("book1", "Ahmed");
const book2 = new Book("book2", "Salem");

// Check toggle function
console.log(book1.isRead);
book1.toggleReadStatus();
console.log(book1.isRead);
book1.toggleReadStatus();
console.log(book1.isRead);

// Check describe function
console.log(book1.describe());
book2.toggleReadStatus();
console.log(book2.describe());
