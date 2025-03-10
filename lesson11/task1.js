function delayedTextOutput(text, ms) {
    setTimeout(() => {
        console.log(text);
    }, ms);
}

delayedTextOutput("Juicy bark in the sunshine door.", 1000);
