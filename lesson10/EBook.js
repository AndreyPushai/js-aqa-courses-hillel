import { Book } from "./Book.js";

export class EBook extends Book {
    constructor(title, author, year, fileFormat) {
        super(title, author, year);
        this._fileFormat = fileFormat;
    }

    printInfo() {
        console.log(
            `${this._title}, ${this._author}, ${this._year}, ${this._fileFormat}`
        );
    }

    get fileFormat() {
        return this.fileFormat;
    }

    set fileFormat(format) {
        if (typeof format !== "string")
            throw new Error("Format should be string");
        this._fileFormat = format;
    }

    // Завдання: Створіть статичний метод для EBook який буде приймати як аргументи екземпляр класу Book і формат файлу як рядок ****та повертати екземпляр класу EBook
    // Не зрозуміло, що мається на увазі як рядок ****, тому зробив таке значення за замовчуванням.
    static fromBook(bookInstance, format = "****") {
        return new EBook(
            bookInstance.title,
            bookInstance.author,
            bookInstance.year,
            format
        );
    }
}
