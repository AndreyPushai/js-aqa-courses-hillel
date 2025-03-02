const hamster = {
    food: [],
    feed(food) {
        this.food = [food];
    }
}

const jerry = {
    name: 'Jerry',
    __proto__: hamster
}

const tom = {
    name: 'Tom',
    __proto__: hamster
}

jerry.feed('corn');
console.log(jerry.food);
console.log(tom.food);
