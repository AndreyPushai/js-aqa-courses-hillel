
export class Book {
    constructor(title, author, year) {
        this._title = title;
        this._author = author;
        this._year = year;
    }

    printInfo() {
        console.log(`${this._title}, ${this._author}, ${this._year}`);
    }

    get title() {
        return this._title;
    }

    set title(title) {
        if (typeof title !== "string") throw new Error("Title should be string");
        this._title = title;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        if (typeof author !== "string") throw new Error("Author should be string");
        this._author = author;
    }

    get year() {
        return this._year;
    }

    set year(year) {
        if (typeof year !== "number") throw new Error("Year should be number");
        this._year = year;
    }

    static getOldest(books) {
        return books.reduce((oldest, current) => 
            current.year < oldest.year ? current : oldest
        );
    }
}
