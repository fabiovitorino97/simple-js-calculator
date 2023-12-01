//declaração de variáveis
let displayValue = '0';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;

// Atualiza o visor da calculadora
function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
}

// Adiciona um número ao visor
function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = (displayValue === '0') ? number.toString() : displayValue + number;
    }
    updateDisplay();
}

// Adiciona o ponto decimal
function addDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

// Limpa todas as entradas (Clear All)
function clearAll() {
    displayValue = '0';
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    updateDisplay();
}

// Limpa a última entrada
function clearEntry() {
    displayValue = '0';
    updateDisplay();
}

// Apaga o último dígito (backspace)
function backspace() {
    displayValue = (displayValue.length === 1) ? '0' : displayValue.slice(0, -1);
    updateDisplay();
}

// Inverte o sinal do número
function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

// Calcula o quadrado do número
function calculateSquare() {
    displayValue = (parseFloat(displayValue) ** 2).toString();
    updateDisplay();
}

// Calcula a raiz quadrada do número
function squareRoot() {
    displayValue = Math.sqrt(parseFloat(displayValue)).toString();
    updateDisplay();
}

// Calcula a inversa do número (1/x)
function calculateInverse() {
    displayValue = (1 / parseFloat(displayValue)).toString();
    updateDisplay();
}

// Calcula a porcentagem
function calculatePercentage() {
    if (firstOperand !== '' && !waitingForSecondOperand) {
        const percentage = (parseFloat(firstOperand) * parseFloat(displayValue) / 100).toString();
        displayValue = percentage;
        updateDisplay();
    } else {
        displayValue = (parseFloat(displayValue) / 100).toString();
        updateDisplay();
    }
}


function setOperator(selectedOperator) {
    if (firstOperand === '') {
        firstOperand = displayValue;
    } else {
        calculate(); // Se já houver um operador e um primeiro operando, realiza o cálculo
    }
    operator = selectedOperator;
    waitingForSecondOperand = true;
    // Após selecionar uma operação, reinicia o display para '0'
    displayValue = '0';
    updateDisplay();
}

// Funções para os operadores básicos
function add() {
    setOperator('+');
}

function subtract() {
    setOperator('-');
}

function multiply() {
    setOperator('*');
}

function divide() {
    setOperator('/');
}

// Calcula o resultado final
function calculate() {
    const secondOperand = displayValue;
    switch (operator) {
        case '+':
            displayValue = (parseFloat(firstOperand) + parseFloat(secondOperand)).toString();
            break;
        case '-':
            displayValue = (parseFloat(firstOperand) - parseFloat(secondOperand)).toString();
            break;
        case '*':
            displayValue = (parseFloat(firstOperand) * parseFloat(secondOperand)).toString();
            break;
        case '/':
            // Verifica se o segundo operando não é zero para evitar divisão por zero
            if (parseFloat(secondOperand) !== 0) {
                displayValue = (parseFloat(firstOperand) / parseFloat(secondOperand)).toString();
            } else {
                displayValue = 'Error';
            }
            break;
        default:
            break;
    }
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    updateDisplay();
}