
function divide(numerator, denominator) {
    if (denominator === 0) throw new Error("Division by zero.");
    if (isNaN(numerator) || isNaN(denominator)) 
        throw new Error("Provided value is not a number");
    return numerator / denominator;
}


try {
	console.log(divide(1, 1));
} catch(error) {
	console.error(error);
} finally {
	console.log("Робота завершена");
}

try {
	console.log(divide(4, 2));
} catch(error) {
	console.error(error);
} finally {
	console.log("Робота завершена");
}

try {
	console.log(divide(1, 0));
} catch(error) {
	console.error(error);
} finally {
	console.log("Робота завершена");
}

try {
	console.log(divide(1, "asdf"));
} catch(error) {
	console.error(error);
} finally {
	console.log("Робота завершена");
}


