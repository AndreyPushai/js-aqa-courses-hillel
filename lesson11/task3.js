
const url = "https://jsonplaceholder.typicode.com";
const todosPath = "/todos/1";
const usersPath = "/users/1";


async function getFirstTodo() {
    const response = await fetch(url + todosPath, {method: "get"});
    const json = await response.json();
    return json
}


async function getFirstUser() {
    const response = await fetch(url + usersPath, {method: "get"});
    const json = await response.json();
    return json
}

try {
    const promiseAll = await Promise.all([getFirstTodo(), getFirstUser()]);
    const promiseRace = await Promise.race([getFirstUser(), getFirstTodo()]);
    console.log(promiseAll);
    console.log(promiseRace);
} catch (error) {
    console.log(error);
}
