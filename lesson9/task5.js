
let users = [
    {
        name: "Bob",
        email: "dylan@gmail.com",
        age: 33,
    },
    {
        name: "Sid",
        email: "meyer@gmail.com",
        age: 55,
    },
    {
        name: "Jake",
        email: "thompson@gmail.com",
        age: 41,
    },
];

for (const { name, email, age } of users) {
    console.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
}

