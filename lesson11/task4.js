
const url = "https://jsonplaceholder.typicode.com";

class FetchHandler {
    constructor(url) {
        this.url = url;
    }

    async #fetchCall(path, method = "GET") {
        return await fetch(`${this.url}${path}`, {method});
    }

    async fetchUser(userNumber) {
        try {
            const response = await this.#fetchCall(`/users/${userNumber}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
        }

    }
    async fetchTodo(toDoNumber) {
        try {
            const response = await this.#fetchCall(`/todos/${toDoNumber}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error);
        }
    }
}

const fetchHandler = new FetchHandler(url);
const asyncCaller = async () => {
    console.log(await fetchHandler.fetchTodo(1));
    console.log(await fetchHandler.fetchUser(1));
}

asyncCaller();

