
const numbersList = [1, 10, 14, 2, 4, 5, 43, 34];
const numListCopy = Array.from(numbersList);

function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    
    return arr;
}

console.log(numbersList);
console.log(bubbleSort(numListCopy));

