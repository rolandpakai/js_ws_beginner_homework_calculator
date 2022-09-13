const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousOperandButton = document.querySelector('[data-previous-operand]');
const currentOperandButton = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandButton, currentOperandButton) {
        this.previousOperandButton = previousOperandButton;
        this.currentOperandButton = currentOperandButton;
        this.clear();
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        let calc;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                calc = previous + current;
                break;
            case '-':
                calc = previous - current;
                break;
            case '*':
                calc = previous * current;
                break;
            case '÷':
                calc = previous / current;
                break;
            default:
                return;
        }

        this.currentOperand = calc;
        this.previousOperand = '';
        this.operation = undefined;
    }
   
    updateDisplay() {
        this.currentOperandButton.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandButton.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandButton.innerText = '';
        }
    }
    getDisplayNumber(val) {
        var sign = 1;
        if (val < 0) {
            sign = -1;
            val = -val;
        }

        let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
        let len = num.toString().length;
        let result = '';
        let count = 1;

        for (let i = len - 1; i >= 0; i--) {
            result = num.toString()[i] + result;
            if (count % 3 === 0 && count !== 0 && i !== 0) {
                result = ',' + result;
            }
            count++;
        }

        if (val.toString().includes('.')) {
          result = result + '.' + val.toString().split('.')[1];
        }

        return sign < 0 ? '-' + result : result;
    }
}

const calculator = new Calculator(previousOperandButton, currentOperandButton);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
  
clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
  
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})