import { Book } from './Book.js';
import { EBook } from './EBook.js';


const book1 = new Book("1984", "George Orwell", 1949);
const book2 = new Book("Brave New World", "Aldous Huxley", 1932);
const book3 = new Book("The Catcher in the Rye", "J.D. Salinger", 1951);

book1.printInfo();
book2.printInfo();
book3.printInfo();

const eBook1 = new EBook("Filth", "Irvine Welsh", 1998, "electronic");
eBook1.printInfo();

book1.author = "Harley Davidson";
book1.title = "How to maintain your bike";
book1.printInfo();

eBook1.fileFormat = "printed";
eBook1.printInfo();

let oldestBook = Book.getOldest(([book1, book2, book3, eBook1]));
oldestBook.printInfo();

let updatedBook = EBook.fromBook(book2, "PDF");
updatedBook.printInfo();

let bookWithoutFormat = EBook.fromBook(book3);
bookWithoutFormat.printInfo();

