
const url = "https://jsonplaceholder.typicode.com";
const todosPath = "/todos/1";
const usersPath = "/users/1";


function getFirstTodo() {
    return fetch(url + todosPath, {method: "get"}
    ).then(
        response => { return response.json() }
    ).then(
        result => { return result }
    ).catch(err => { console.log(err) })
}


function getFirstUser() {
    return fetch(url + usersPath, {method: "get"}
    ).then(
        response => { return response.json() }
    ).then(
        result => { return result }
    ).catch(err => { console.log(err) })
}


const promiseAll = Promise.all([getFirstTodo(), getFirstUser()]);
const promiseRace = Promise.race([getFirstUser(), getFirstTodo()]);

promiseAll.then(console.log);
promiseRace
  .then(x => console.log('Fulfilled: ', x))
  .catch(x => console.log('Rejected: ', x));

