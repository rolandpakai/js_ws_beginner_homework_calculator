class Calculator {

    previousOperandText = "";
    currentOperandText = "";
    operator = undefined;

    constructor(){
        this.clear();
    }

    clear(){
        this.previousOperandText = "";
        this.currentOperandText = "";
        this.operator = undefined;

        this.updateDisplay();
    }
    
    delete(){
        if (this.currentOperandText != null) {
            this.currentOperandText = this.currentOperandText.substring(0, this.currentOperandText.length - 1);
        }

        this.updateDisplay();
    }
    
    appendNumber(e){
        this.currentOperandText = this.currentOperandText.concat(e.target.textContent);

        this.updateDisplay();
    }
    
    chooseOperation(e){
        if (this.operator != undefined) {
            return this.compute();
        }

        this.previousOperandText = this.currentOperandText;
        this.currentOperandText = "";
        this.operator = e.target.textContent;

        this.updateDisplay();
    }
    
    compute(){
        if (this.previousOperandText == "" || this.currentOperandText == "" || this.operator == undefined) {
            return;
        }

        let leftOperand = parseFloat(this.previousOperandText);
        let rightOperand = parseFloat(this.currentOperandText);
        let result = 0;

        switch (this.operator) {
            case '+':
                result = leftOperand + rightOperand;
                break;
            case '-':
                result = leftOperand - rightOperand;
                break;
            case '*':
                result = leftOperand * rightOperand;
                break;
            case '÷':
                result = leftOperand / rightOperand;
                break;
        }

        this.previousOperandText = "";
        this.currentOperandText = result.toString();
        this.operator = undefined;

        this.updateDisplay();
    }
    
    updateDisplay(){
        previousOperand.textContent = this.previousOperandText;
        currentOperand.textContent = this.currentOperandText;    }

}

const numberButtons = document.querySelectorAll("button[data-number]");
const operationButtons = document.querySelectorAll("button[data-operation]");
const equalsButton = document.querySelector("button[data-equals]");
const deleteButton = document.querySelector("button[data-delete]");
const clearButton = document.querySelector("button[data-all-clear]");
const previousOperand = document.querySelector("div[data-previous-operand]");
const currentOperand = document.querySelector("div[data-current-operand]");

let calc = new Calculator();

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {calc.appendNumber(e)});
});

operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {calc.chooseOperation(e)});
});

deleteButton.addEventListener('click', () => {calc.delete()});

clearButton.addEventListener('click', () => {calc.clear()});

equalsButton.addEventListener('click', () => {calc.compute()});