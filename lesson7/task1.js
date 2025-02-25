
function handleNum(num, callback1, callback2) {
    if (num % 2 === 0) {
        callback1();
    } else {
        callback2();
    }
}


function handleEven() {
    console.log("Number is even");

}


function handleOdd() {
    console.log("Number is odd");
}


handleNum(5918235, handleEven, handleOdd);

