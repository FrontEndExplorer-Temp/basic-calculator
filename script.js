let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentInput = "";
let resultDisplayed = false;

// Basic math operations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Nice try.";
  return a / b;
}

// Round to avoid overflow
function roundResult(num) {
  return Math.round(num * 100000) / 100000;
}

// Perform the operation
function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === "+") return roundResult(add(a, b));
  if (op === "-") return roundResult(subtract(a, b));
  if (op === "*") return roundResult(multiply(a, b));
  if (op === "/") return divide(a, b);
}

// Convert display symbols to logic operators
function convertOperator(symbol) {
  if (symbol === "×") return "*";
  if (symbol === "÷") return "/";
  return symbol;
}

// Update screen
function updateDisplay(content) {
  const display = document.getElementById("display");
  display.textContent = content;
}

// Handle number/dot input
function handleDigitClick(digit) {
  if (resultDisplayed) {
    currentInput = "";
    resultDisplayed = false;
  }

  if (digit === "." && currentInput.includes(".")) return;

  currentInput += digit;
  updateDisplay(currentInput);
}

// Handle operator clicks
function handleOperatorClick(opSymbol) {
  const op = convertOperator(opSymbol);

  if (currentInput === "" && firstNumber === null) return;

  if (currentInput !== "") {
    if (firstNumber === null) {
      firstNumber = currentInput;
    } else if (operator) {
      secondNumber = currentInput;
      const result = operate(operator, firstNumber, secondNumber);
      updateDisplay(result);
      firstNumber = result;
    }
    currentInput = "";
  }

  operator = op;
  resultDisplayed = false;
}

// Handle equals
function handleEqualsClick() {
  if (firstNumber !== null && operator && currentInput !== "") {
    secondNumber = currentInput;
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    currentInput = "";
    operator = null;
    resultDisplayed = true;
  } else {
    updateDisplay("Error");
  }
}

// Handle clear
function handleClear() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  currentInput = "";
  resultDisplayed = false;
  updateDisplay("0");
}

// Handle backspace
function handleBackspace() {
  if (resultDisplayed) return;
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
}

// Attach event listeners
document.querySelectorAll(".btn").forEach((button) => {
  const value = button.textContent;

  if (button.classList.contains("operator")) {
    button.addEventListener("click", () => handleOperatorClick(value));
  } else if (button.classList.contains("equals")) {
    button.addEventListener("click", handleEqualsClick);
  } else if (button.classList.contains("clear")) {
    button.addEventListener("click", handleClear);
  } else if (button.classList.contains("backspace")) {
    button.addEventListener("click", handleBackspace);
  } else {
    // Number or decimal
    button.addEventListener("click", () => handleDigitClick(value));
  }
});
