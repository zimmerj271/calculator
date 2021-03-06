// this function is redundant. The splitString handles the split to array
// more efficiently.  Will remove on final version.
function tokenize(str) {
    const input = str.split(/\s+/);
    const r = [];
    let token = '';

    for (let char of input) {
        // console.log(char);
        if('^*/+-'.indexOf(char) > -1) {
            if(token === '' && char === '-') { // when string is preceeded by '-'
                token = '-';
                // console.log(token);
            } else {
                r.push(parseFloat(token), char);
                // console.log(r);
                token = '';
            }
        } else {
            token += char; // append to previous token if not empty, should only happen if preceeded by '-'.
            // console.log(token);
        }
    }
    if (token !== '') {
        r.push(parseFloat(token));
        // console.log(r);
    }
    // console.log(r);
    return r;
}

// takes input string from display and splits on the whitespace into an array.
// output is to be fed directly into the calculate function
function splitString(str) {
    let arr = [];
    str = str.split(/\s+/); // split string into an array

    for (let x of str) {
        if(!isNaN(x)) {
            arr.push(parseFloat(x));
        } else if (/[-\+\*\/]/.test(x)) {
            arr.push(x);
        }
    };
    // console.log(arr);
    return arr;
}

// function to calculate math expression from array of tokenized elements
function calculate(tokens) {
    // define an array of object lists.  The objects within the
    // lists will contain functions associated with the key string.
    // array acts like a look-up table to pass the corresponding function
    // when the operator token is encountered.
    const orderOfOperation = [
        {'*': (a, b) => a * b},
        {'/': (a, b) => a / b},
        {'+': (a, b) => a + b},
        {'-': (a, b) => a - b}
    ];

    let operator;  // initialize variable to contain the function of the associated token
    // loop through list of token/operator function pairs.
    for (let op of orderOfOperation) {
        let stack = [];  // initialize empty array for each operator.  This array will be used as a stack data structure
        // loop through each array element from the display
        for (let token of tokens) {
            if (token in op) {  // if array element matches the current operator in outer loop
                operator = op[token];  // assign associated operator function from orderOfOperations array
            } else if (operator) { // if operator is already defined 
                // add to the end of stack array
                // the defined operator function
                // the operator function will take the previous value
                // located at the end of the stack array and the current token (number)
                stack[stack.length - 1] = 
                    operator(stack[stack.length - 1], token);
                operator = null;  // assign operator to null after it's used to clear it for the next operator
            } else { // if array element is a number or not the current outer loop operator, push onto stack
                stack.push(token);
            }
        }
        tokens = stack; // load each iterative operation back to tokens array
    }
    // once loop through operations is complete, tokens array will contain completed calculation
    if (tokens.length > 1) {
        console.log('Error');
        return tokens;
    } else {
        return tokens[0];
    }
}

// function to shorten floats from default length
function shortenFloat(str) {
    if(Number.isInteger(str)) {
        return str;
    } else {
        return Number(str.toFixed(10));
    }
}

// function to clear the display
function clear() {
    return "0";
}

// function to remove the last entry in display
function backspace(str) {
    str = str.split(/\s+/);  // split string into array on whitespace
    str = str.slice(0, -1); // return string with last element removed
    if (str.length === 0) { // if array is empty, initiate clear function
        return clear();
    } else { // else join array back up with whitespace
        return str.join(' ');
    }
}

// function to take number in display and convert to negative value
function makeNegative(str) {
    // if str contains whitespace or math operators, make no change
    if(/[-\+\*\/\s/]/.test(str)) {
        return str;
    } else { // else add '-' in front of string
        str = `-${str}`;
        return str;
    }
}

// function to detect a divide by zero condition
function divideByZero(str) {
    return /\/\s+0/.test(str);
}

// function to detect if calculation entered is not complete
function checkDisplayStr(str) {
    return /[\.\+\*\/-]+\s*?$/.test(str);
}

const display = document.getElementById("display"); // variable to contain display element
const displayText = display.getElementsByTagName("p")[0];  // variable to contain <p> element that contains display text. getElementsByTagName returns an array

const buttons = document.querySelectorAll("button");  // get array of button elements

// loop through each button and add an event listener for "click"
buttons.forEach(bttn => bttn.addEventListener("click", (e) => {


    if(bttn.className === "operator") {  // if button class is "operator"
        if(!(displayText.textContent === "0")) {
            displayText.textContent = `${displayText.textContent} ${bttn.textContent} `;
        }
    } else if (bttn.className === "number") { // if button class is "number"
        if(displayText.textContent === "0") { // if the display is already set to "0"
            displayText.textContent = `${bttn.textContent}`;  // replace with string from button element
        } else { // else replace with previous char and new char together without whitespace
            displayText.textContent = `${displayText.textContent}${bttn.textContent}`;
        }
    } else if (bttn.id === "backspace") { // if button is backspace, remove on element from display
        displayText.textContent = backspace(displayText.textContent);
    } else if (bttn.id === "negative") { // if button is negative
        if(!(displayText.textContent === "0")) { // and display isn't "0"
            displayText.textContent = makeNegative(displayText.textContent);
        }
    } else if (bttn.id === "equal") { // if button is equal then calculate expression
        // calculate(tokenize(displayText.textContent));
        let result;
        if(divideByZero(displayText.textContent)) {
            result = "To infinity and beyond!"
        } else if (checkDisplayStr(displayText.textContent)) {
            result = "ERROR";
        } else {
            result = calculate(splitString(displayText.textContent));
            result = shortenFloat(result);
        }
        displayText.textContent = result;
    }
    if(bttn.id === "clear") {  // if clear button, remove all text and replace with "0"
        displayText.textContent = clear();
    }
}));

// event listeners for keydown event and redirect to corresponding button
document.addEventListener("keydown", (event) => {
    const ec = event.code;      // variable for event code to look for.  Event code is specified for each key on the keyboard
    const ek = event.key;       // variable for event key.  Instead of code -> key, looks for ascii char -> key

     if (ec === "NumpadAdd" || ek === "+") {
        document.getElementById("add").click();
    } else if (ec === "NumpadSubtract" || ec === "Minus") {
        document.getElementById("subtract" || ek === "-").click();
    } else if (ec === "NumpadEnter" || ec === "Enter") {
        document.getElementById("equal").click();
    } else if (ec === "NumpadMultiply" || ek === "*") {
        document.getElementById("multiply").click();
    } else if (ec === "NumpadDivide" || ec === "Slash") {
        event.preventDefault();      // prevent browser from starting 'find'
        document.getElementById("divide").click();
    } else if (ec === "Backspace") {
        document.getElementById("backspace").click();
    } else if (ec === "Escape") {
        document.getElementById("clear").click();
    } else if (ec === "Numpad0" || ec === "Digit0") {
        document.getElementById("zero").click();
    } else if (ec === "Numpad1" || ec === "Digit1") {
        document.getElementById("one").click();
    } else if (ec === "Numpad2" || ec === "Digit2") {
        document.getElementById("two").click();
    } else if (ec === "Numpad3" || ec === "Digit3") {
        document.getElementById("three").click();
    } else if (ec === "Numpad4" || ec === "Digit4") {
        document.getElementById("four").click();
    } else if (ec === "Numpad5" || ec === "Digit5") {
        document.getElementById("five").click();
    } else if (ec === "Numpad6" || ec === "Digit6") {
        document.getElementById("six").click();
    } else if (ec === "Numpad7" || ec === "Digit7") {
        document.getElementById("seven").click();
    } else if (ec === "Numpad8" || ec === "Digit8") {
        document.getElementById("eight").click();
    } else if (ec === "Numpad9" || ec === "Digit9") {
        document.getElementById("nine").click();
    } else if (ec === "NumpadDecimal" || ec === "Period") {
        document.getElementById("decimal").click();
    }

});


// set initial display
displayText.textContent = clear();

