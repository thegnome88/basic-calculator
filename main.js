const layout = document.querySelector('.layout');
const display = document.querySelector('#value');

let previousNumber = NaN;
let currentOperator = '';
let currentValue = '';
let answerOnScreen = false;

function buttonClicked(e) {
    let element = e.target;

    if (element.classList.contains('number')) {
        numberClicked(parseInt(element.textContent));
    } else if (element.classList.contains('operator')) {
        console.log(e.id);
        operatorClicked(element.id);
    } else if (element.classList.contains('special')) {
        specialClicked(element.id);
    }
}

function updateDisplay() {
    display.textContent = currentValue;

    if (display.scrollWidth > display.clientWidth) {
        currentValue = currentValue.slice(0, -1);
        updateDisplay();
    }
}

function numberClicked(number) {
    if (answerOnScreen && currentOperator !== '') {
        previousNumber = parseFloat(currentValue);
        currentValue = '';
        answerOnScreen = false;
    }
    currentValue += number;
    updateDisplay();
}

function operatorClicked(operator) {
    if (Number.isNaN(previousNumber) || currentOperator === '') {
        fillDot()
        previousNumber = parseFloat(currentValue);
        currentValue = '';
        updateDisplay();
        answerOnScreen = false;
    } else if (!answerOnScreen && currentValue !== '') {
        specialClicked('equal');
    }

    currentOperator = operator;
}

function specialClicked(button) {
    if (button === 'clear') {
        previousNumber = NaN;
        currentOperator = '';
        currentValue = '';
        answerOnScreen = false;
        updateDisplay();
    } else if (button === 'delete' && (!answerOnScreen || currentOperator === '')) {
        currentValue = currentValue.slice(0, -1);
        updateDisplay();
    } else if (button === 'dot' && !currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    } else if (button === 'equal') {
        fillDot()
        switch (currentOperator) {
            case 'add':
                currentValue = (previousNumber + parseFloat(currentValue)).toString();
                updateDisplay();
                break;
            case 'subtract':
                currentValue = (previousNumber - parseFloat(currentValue)).toString();
                updateDisplay();
                break;
            case 'multiply':
                currentValue = (previousNumber * parseFloat(currentValue)).toString();
                updateDisplay();
                break;
            case 'divide':
                currentValue = (previousNumber / parseFloat(currentValue)).toString();
                updateDisplay();
                break;
        }
        answerOnScreen = true;
        currentOperator = '';
    }
}

function fillDot() {
    if (currentValue[-1] === '.') {
        currentValue += 0
    }
}

layout.addEventListener('click', buttonClicked);