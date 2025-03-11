const person = {
    firstName: "Stepan",
    lastName: "Giga",
    age: 65,
};

person.email = "stepan.giga@gmail.com";
delete person.age;

console.log(person);
