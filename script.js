const numberBtns = document.querySelectorAll('button[data-number]');
const operationBtns = document.querySelectorAll('button[data-operation]');
const equalsBtn = document.querySelector('button[data-equals]');
const deleteBtn = document.querySelector('button[data-delete]');
const clearBtn = document.querySelector('button[data-all-clear]');
const previousOperandText = document.querySelector('div[data-previous-operand]');
const currentOperandText = document.querySelector('div[data-current-operand]');

class Calculator {

    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number;
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const currentNumber = parseFloat(this.currentOperand);
        const previousNumber = parseFloat(this.previousOperand);
        if(previousNumber === null || currentNumber === null) return;
        if(this.operation === '÷') {
            result = previousNumber / currentNumber;
        } else if (this.operation === '*') {
            result = previousNumber * currentNumber;
        } else if (this.operation === '+') {
            result = previousNumber + currentNumber;
        } else if (this.operation === '-') {
            result = previousNumber - currentNumber; 
        } else {
            return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandText.innerText = this.previousOperand.toString() + ' ' + this.operation.toString();
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOperandText,currentOperandText);

numberBtns.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

clearBtn.addEventListener('click',() => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsBtn.addEventListener('click',() => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click',() => {
    calculator.delete();
    calculator.updateDisplay();
});