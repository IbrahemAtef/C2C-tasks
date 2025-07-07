// Style 1 (Object literal)
const book = {
  title: "Harry Potter",
  author: "Ahmed",
  isRead: false,
  toggleReadStatus: function () {
    this.isRead = !this.isRead;
  },
  describe: function () {
    return `${this.title} by ${this.author} is ${
      this.isRead ? "Read" : "Unread"
    }`;
  },
};

// Check toggle function
console.log(book.isRead);
book.toggleReadStatus();
console.log(book.isRead);
book.toggleReadStatus();
console.log(book.isRead);

// Check describe function
console.log(book.describe());
