// operator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(numerator, denominator) {
    return numerator / denominator;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
        default:
            return null;
    }
}

function calculate(arr) {
    for (i in arr) {
        console.log(arr[i]);
    }
}



const display = document.getElementById("display");
const displayText = display.getElementsByTagName("p")[0];  // getElementsByTagName returns an array

function clear(arr) {
    arr = [];
    displayText.textContent = "";
    return arr;
}

function backspace() {
    let str = displayText.textContent;
    return str.slice(0, -1);
}
let numArray = [];
const buttons = document.querySelectorAll("button");
buttons.forEach(bttn => bttn.addEventListener("click", (e) => {
    // console.log(bttn.textContent);
    // console.log(bttn.className)
    
    let isFloat = false;
    const buttonClass = bttn.className;
    const buttonID = bttn.id;

    if(bttn.className === "operator") {
        displayText.textContent = `${displayText.textContent} ${bttn.textContent} `;    
    } else if (bttn.className === "number") {
        displayText.textContent = `${displayText.textContent}${bttn.textContent}`;
    } else if (bttn.id === "backspace") {
        displayText.textContent = backspace();
    } else if (buttonID === "decimal") {
        isFloat = true;
    } else if (buttonID === "equal") {
        numArray = displayText.textContent.split(/\s+/);
        calculate(numArray);
    }
    // displayText.textContent = `${displayText.textContent} ${bttn.textContent}`;
    if(bttn.id === "clear") {
        numArray = clear(numArray);
    }
    console.log(numArray)
}))

clear();

// event listeners
// function numberListener() {
//     const numButtons = document.querySelectorAll('.number');
//         numButtons.forEach(bttn => bttn.addEventListener('click', (e) => {
//             console.log(bttn.textContent);
//             let display = document.getElementById("display");
//             let ptag = display.getElementsByTagName("p")[0];
//             ptag.textContent = bttn.textContent;

//         }
//     ))
// }
// numberListener();

// function operatorListener() {
//     const opButtons = document.querySelectorAll('.operator');
//         opButtons.forEach(bttn => bttn.addEventListener('click', (e) => {
//             console.log(bttn.id);
//             return bttn.id;
//         }
//     ))
// };
// operatorListener();

// function getResult() {
//     const equalButton = document.getElementById('equal');
//     equalButton.addEventListener('click', (e) => {
//         console.log(equalButton.id);
//     })
// }

// getResult();

