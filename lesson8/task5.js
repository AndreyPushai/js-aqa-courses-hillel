const firstArray = [1, 2, 3, "test", null];
const secondArray = [4, 5, 6, undefined, [0, 0, 1]];

const unitedArray = [...firstArray, ...secondArray];

console.log(unitedArray);
