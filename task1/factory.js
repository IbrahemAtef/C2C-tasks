// Style 2 (Factory function)
function createBook(title, author, isRead = false) {
  const book = {};
  book.title = title;
  book.author = author;
  book.isRead = isRead;

  (book.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  }),
    (book.describe = function () {
      return `${this.title} by ${this.author} is ${
        this.isRead ? "Read" : "Unread"
      }`;
    });
  return book;
}

const book1 = createBook("book1", "Ahmed");
const book2 = createBook("book2", "Salem");

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
