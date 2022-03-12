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



const display = document.getElementById("display");
const displayText = display.getElementsByTagName("p")[0];  // getElementsByTagName returns an array

function clear() {
    displayText.textContent = "";
}

function backspace() {
    let str = displayText.textContent;
    return str.slice(0, -1);
}


const buttons = document.querySelectorAll("button");
buttons.forEach(bttn => bttn.addEventListener("click", (e) => {
    // console.log(bttn.textContent);
    // console.log(bttn.className)
    let numArray = [];
    if(bttn.className === "operator") {
        displayText.textContent = `${displayText.textContent} ${bttn.textContent} `;    
    } else if (bttn.className === "number") {
        displayText.textContent = `${displayText.textContent}${bttn.textContent}`;
    } else if (bttn.id === "backspace") {
        displayText.textContent = backspace();
    }
    // displayText.textContent = `${displayText.textContent} ${bttn.textContent}`;
    if(bttn.id === "clear") {
        clear();
    }
    
}))

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

