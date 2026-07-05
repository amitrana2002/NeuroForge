let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstNumber = null;
let resultDisplayed = false;

function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    if (currentInput === '0' && number !== '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (resultDisplayed) {
        currentInput = '0.';
        resultDisplayed = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function selectOperator(op) {
    if (currentInput === '' && firstNumber === null) return;
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
        operator = op;
        currentInput = '';
    } else if (currentInput !== '') {
        calculate();
        operator = op;
    }
}

function calculate() {
    if (firstNumber === null || currentInput === '' || operator === null) {
        if (currentInput !== '') {
            firstNumber = parseFloat(currentInput);
            updateDisplay();
        }
        return;
    }
    let secondNumber = parseFloat(currentInput);
    let result;
    switch (operator) {
        case '+': result = firstNumber + secondNumber; break;
        case '-': result = firstNumber - secondNumber; break;
        case '*': result = firstNumber * secondNumber; break;
        case '/':
            if (secondNumber === 0) {
                showError('Cannot divide by zero');
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default: result = secondNumber;
    }
    currentInput = result.toString();
    firstNumber = null;
    operator = null;
    resultDisplayed = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '';
    operator = null;
    firstNumber = null;
    resultDisplayed = false;
    updateDisplay();
}

function showError(message) {
    display.textContent = message;
    setTimeout(() => {
        updateDisplay();
    }, 2000);
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}
