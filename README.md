# Calculator app in HTML, CSS & JavaScript

## Steps

1. Get the button elements of the calculator. You can use querySelectorAll and querySelector for that.
The calculator buttons are: numbers, operation, equals, delete, clear, previousOperand and currentOperand
2. Create a Calculator class with a constructor where the information is stored
3. Implement all the operations that your calculator can perform, for instance clear(), delete() appendNumber(), chooseOperation(), compute(), updateDisplay() function
4. Call the clear() function inside the constructor to clear the inputs
5. Create a calculator object where the Calculator class is stored
6. Add a click event listener to each number and operation button (numberButtons and operationButtons), so when you click on a button, the value is displayed. You can loop over each of the buttons using forEach.
7. Add a click event listener to the equals button that computes and displays the value
8. Add a click event listener to the clear button (allClearButton) that clears and updates the value
9.  Add a click event listener to the delete button (deleteButton) that deletes and updates the value
10. Extra step: Create a getDisplayNumber() function that nicely displays the number with delamination

![Themed Calculator](/preview.png)
