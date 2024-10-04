const CalculatorScreen = document.getElementById("CalculatorScreen");
const AllButtons = document.querySelectorAll(".Button button");
const HelloButton = document.getElementsByClassName("Hellobutton")[0];
const ByeButton = document.getElementsByClassName("Byebutton")[0];
const DelButton = document.getElementsByClassName("DELbutton")[0];
const AcButton = document.getElementsByClassName("ACbutton")[0];
const SevenButton = document.getElementsByClassName("Sevenbutton")[0];
const EightButton = document.getElementsByClassName("Eightbutton")[0];
const NineButton = document.getElementsByClassName("Ninebutton")[0];
const MultiplyButton = document.getElementsByClassName("Multiplybutton")[0];
const FourButton = document.getElementsByClassName("Fourbutton")[0];
const FiveButton = document.getElementsByClassName("Fivebutton")[0];
const SixButton = document.getElementsByClassName("Sixbutton")[0];
const SubtractButton = document.getElementsByClassName("Subtractbutton")[0];
const ThreeButton = document.getElementsByClassName("Threebutton")[0];
const TwoButton = document.getElementsByClassName("Twobutton")[0];
const OneButton = document.getElementsByClassName("Onebutton")[0];
const AddButton = document.getElementsByClassName("Addbutton")[0];
const ZeroButton = document.getElementsByClassName("Zerobutton")[0];
const PeriodButton = document.getElementsByClassName("Periodbutton")[0];
const EqualButton = document.getElementsByClassName("Equalbutton")[0];
const DivideButton = document.getElementsByClassName("Dividebutton")[0];

const greetings = [
    "Hello",          // English
    "Hola",           // Spanish
    "Bonjour",        // French
    "Hallo",          // German
    "Ciao",           // Italian
    "こんにちは",        // Japanese (Konnichiwa)
    "안녕하세요",        // Korean (Annyeonghaseyo)
    "你好",            // Chinese (Nǐ hǎo)
    "Здравствуйте",     // Russian (Zdravstvuyte)
    "Olá",            // Portuguese
    "Merhaba",        // Turkish
    "Hola",           // Catalan
    "Namaste",        // Hindi
    "Sawasdee",       // Thai
    "Saluton",        // Esperanto
    "Aloha",          // Hawaiian
    "Shalom",         // Hebrew
    "Xin chào",      // Vietnamese
    "Kamusta",        // Filipino
    "Heippa"         // Finnish
];

let current_input = "";
let answer = 0;
let expression = "";
let inputted_numbers = [];
let last_button_was_operator = false;
let first_button_is_operator = false;
EqualButton.disabled = true;


const HandleInputLimit = () => {

    if (expression.length > 16) {
        expression = expression.slice(0, 16);
    }
    CalculatorScreen.value = expression

};


const HandleHelloButton = () => {

    let random_greeting = greetings[(Math.floor(Math.random() * greetings.length))];
    CalculatorScreen.value = random_greeting;
};



const HandleByeButton = () => {

    CalculatorScreen.value = "Goodbye";

    AllButtons.forEach(button => {
        if (button !== AcButton){
            button.disabled = true;
        };
    });

    setTimeout(() => {
        CalculatorScreen.style.backgroundColor = "#35424c";
        CalculatorScreen.value = "";
    }, 700)

};


const HandleDeleteButton = () => {

    //Removes the last character.
    current_input = current_input.slice(0, -1); 
    expression = expression.slice(0, -1);     
    
    if (inputted_numbers.length > 0) {
        const lastInputIndex = inputted_numbers.length - 1; //Gets the last index of the inputted_numbers array.
        const lastInput = inputted_numbers[lastInputIndex]; //Gets the character in the last index of the array.

        /* Checks if the expression length is less than the joined inputted_numbers array and if it is, 
           removes the last character of the last character in the array to match the length of the expression. */
        if (expression.length < inputted_numbers.join("").length) {
            inputted_numbers[lastInputIndex] = lastInput.slice(0, -1);

            // Checks if the last character is an empty string and removes it in the array if it is.
            if (inputted_numbers[lastInputIndex] === "") {
                inputted_numbers.pop();
            };
        };
    };

    // Checks if the first character in the expression is an operator and handles state changes.
    if (expression === "") {
        first_button_is_operator = false;
    } else {
        first_button_is_operator = true;
    };

    // Checks if the last character in the expression is an operator and handles state changes
    const lastChar = expression.slice(-1); 
    
    if (["+", "-", "×", "÷"].includes(lastChar)) {
        last_button_was_operator = true; 
    } else {
        last_button_was_operator = false;
    };

};


const HandleAcButton = () => {

    // Enables disabled buttons and resets global variables
    AllButtons.forEach(button => {
        button.disabled = false;
    });
    
    current_input = "";
    answer = 0;
    expression = "";
    inputted_numbers = [];
    last_button_was_operator = false;
    first_button_is_operator = false;
    CalculatorScreen.style.backgroundColor = "#5d838a"
    CalculatorScreen.value = "";

};


const HandleNumberButtons = (num) => {

    if (expression.length >= 16) return; // Returns nothing if you click a number button when the expression reaches the screen limit.

    // Empties the expression when you click a number button after the aswer was displayed.
    if (expression === String(answer)) {
        expression = "";
    };

    // Empties the inputted_numbers array when you click a number button after the asnwer was displayed.
    if (answer === parseFloat(inputted_numbers[0]) && inputted_numbers.length === 1) {
        inputted_numbers.splice(0,1);
    };

    // Incrementing num to the current_input and expression as well as handling state changes.
    current_input += num;
    expression += num;
    PeriodButton.disabled = false
    last_button_was_operator = false;
    first_button_is_operator = true;
    HandleInputLimit();

};


const HandlePeriodButton = () => {

    if (expression.length >=16) return;

    last_button_was_operator = true;

    /* Checks if the current_input string does not include "."
       and increments "." to both current_input and expression if it doesn't. */
    if (!current_input.includes(".")) {
        current_input += ".";
        expression += ".";
    };
    
    first_button_is_operator = true;

};


const HandleOperatorButtons = (operator) => {

    let signs = ["×", "÷", "+", "-"]

    if (expression.length >=16) return;

    if (last_button_was_operator) return; // Condition to avoid consecutive adding of operators.

    // Allow input of a negative number only at the start of the expression.
    if (operator !== "-") {
        if (!first_button_is_operator) return;
    };

    // Disallows adding an operator as your first input. Must be a number.
    if (current_input === "") {
        if (signs.every((sign) => !expression.includes(sign))) {
            
        } 

    } else {
        inputted_numbers.push(current_input); // Adds the current_input to the inputted_numbers array after pressing an operator.
    };


    expression += operator ; // Adds the operator in the expression.
    inputted_numbers.push(operator); // Adds the operator as a string in the inputted_numbers array.
    current_input = "" ; // Clears the current_input after pressing an operator to allow input of another number.
    last_button_was_operator = true;
    first_button_is_operator = true;
    PeriodButton.disabled = false
    EqualButton.disabled = false;

};


const CalculateAnswer = () => {

    let index = 0; 

    /* Uses index to iterate over the inputted numbers. 
       The loop stops when the length of the inputted_numbers array is 1, meaning the only character in the array is the answer of the expression. */
    while (index < inputted_numbers.length) {

        // Checks if the index of "×" in the inputted_numbers array matches the value of the index variable.
        if (inputted_numbers[index] === "×") {
            let product = parseFloat(inputted_numbers[index - 1]) * parseFloat(inputted_numbers[index + 1]); // Retrieves the numbers on the left and right side of the operator and multiplies them both.
            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2)); // Updates the array with the product replacing the operator and the two numbers besides the operator.
            index = 0; // Resets the value of index variable to iterate the updated array once again starting from index 0.

        // Checks if the index of "÷" in the inputted_numbers array matches the value of the index variable.
        } else if (inputted_numbers[index] === "÷") {
            let quotient = parseFloat(inputted_numbers[index - 1]) / parseFloat(inputted_numbers[index + 1]); // Retrieves the number on the left and right side of the operator and divides them both.

            // Check if the quotient equals to Infinity and displays "Can't divide by zero!" instead of Infinity.
            if (!isFinite(quotient)) {
                CalculatorScreen.value = "Can't divide by zero!";

                // Disables all buttons except AcButton if the quotient equals to Infinity.
                AllButtons.forEach(button => {
                    if (button !== AcButton){
                        button.disabled = true;
                    };
                });

                inputted_numbers = []; 
                expression = ""; 
                current_input = ""; 
                return; 
            };

            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([quotient.toString()], inputted_numbers.slice(index + 2)); // Updates the array with the quotient replacing the operator and the two numbers besides the operator.
            index = 0; // Resets the value of index variable to iterate the updated array once again starting from index 0.
            
        } else {
            index += 1; // Increment index if the character is not an operator to iterate to the next character.
        };
    };

    // Same logic applies to both Addition and Subtraction.

    index = 0; 

    while (index < inputted_numbers.length) {
        if (inputted_numbers[index] === "+") {
            let sum = parseFloat(inputted_numbers[index - 1]) + parseFloat(inputted_numbers[index + 1]);
            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([sum.toString()], inputted_numbers.slice(index + 2));
            index = 0; 

        } else if (inputted_numbers[index] === "-") {
            let difference = parseFloat(inputted_numbers[index - 1]) - parseFloat(inputted_numbers[index + 1]);
            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([difference.toString()], inputted_numbers.slice(index + 2));
            index = 0; 

        } else {
            index += 1;
        };
    };
    
    answer = parseFloat(inputted_numbers[0]); // Retrieves the character at index 0 which is the stringed answer and converts it into a number.

    // Check if the answer is longer than the screen limit and then slice the answer.
    if (answer.toString().length>16) {
        answer = answer.toString().slice(0, 10);
    };

    // Checks if the answer is a decimal to avoid adding an extra "." to the answer.
    if (answer.toString().includes(".")) {
        PeriodButton.disabled = true;
    };

    CalculatorScreen.value = answer.toString();

};


// addEventListeners for each button with functions being called.

HelloButton.addEventListener("click", (event) => {
    HandleHelloButton();
});


ByeButton.addEventListener("click", (event) => {
   HandleByeButton();
});


DelButton.addEventListener("click", (event) => {
    HandleDeleteButton();
    HandleInputLimit();
});


AcButton.addEventListener("click", (event) => {
    HandleAcButton();
});


[ZeroButton, OneButton, TwoButton, ThreeButton, FourButton, FiveButton, SixButton, SevenButton, EightButton, NineButton].forEach((button, index) => {
    button.addEventListener("click", () => HandleNumberButtons(index.toString()));
});


PeriodButton.addEventListener("click", (event) => {
    HandlePeriodButton();
    HandleInputLimit();
});


MultiplyButton.addEventListener("click", (event) => {
    HandleOperatorButtons("×");
    HandleInputLimit();
});


AddButton.addEventListener("click", (event) => {
    HandleOperatorButtons("+");
    HandleInputLimit();

});


SubtractButton.addEventListener("click", (event) => {
    HandleOperatorButtons("-");
    HandleInputLimit();
});


DivideButton.addEventListener("click", (event) => { 
    HandleOperatorButtons("÷");
    HandleInputLimit();
});


EqualButton.addEventListener("click", (event) => {

    // Checks if the inputted_numbers array is empty and displays your current input when you click the Equal Button if it is.
    if (inputted_numbers.length === 0) {
        CalculatorScreen.value = current_input;

    } else {

        // Checks if current_input is not empty and pushes your current inputted number to the inputted_numbers array.
        if (current_input !== "") {
            inputted_numbers.push(current_input); 
        };
        
        // Checks if the inputted_number array contains unnecessary empty strings and it creates a new array without it.
        if (inputted_numbers.includes("")) {
            inputted_numbers = inputted_numbers.filter(num => num !== "");
        };

        /* Checks if the last character in the inputted_numbers array is an operator when you click the Equal Button.
           It then displays "Syntax Error" and disables all the button except the AcButton. */
        if (["×", "÷", "+", "-"].includes(inputted_numbers[inputted_numbers.length - 1])) {
            CalculatorScreen.value = "Syntax Error";

            AllButtons.forEach(button => {
                if (button !== AcButton){
                    button.disabled = true;
                };
            });

            return;
        };

        let new_inputted_numbers = [];

        // Checks if the first character is "-" and the second character is a number. It then combines the two to be a negative number.
        if (inputted_numbers.length >= 2 && inputted_numbers[0] === "-" && !isNaN(inputted_numbers[1])) {
            inputted_numbers = [inputted_numbers[0] + inputted_numbers[1]].concat(inputted_numbers.slice(2));
        };

        for (let i = 0; i < inputted_numbers.length; i++) {

            /* Checks if there are consecutive numbers in the array. If it does it combines those two numbers as one number.
               The combined numbers is then added to a new array together with the rest of the characters in the inputted_numbers array. */
            if (i < inputted_numbers.length - 1 && !isNaN(inputted_numbers[i]) && !isNaN(inputted_numbers[i + 1])) {
                new_inputted_numbers.push(inputted_numbers[i] + inputted_numbers[i + 1]);
                i++; 

            } else {
                new_inputted_numbers.push(inputted_numbers[i]);
            };
        };

        inputted_numbers = new_inputted_numbers; // Updates the inputted_numbers array with the value of the new_inputted_numbers array.
    };


    CalculateAnswer(); // Calls the function to calculate the inputted_numbers array after refactoring it.

    current_input = "" ;
    expression = "" ;
    expression = answer.toString();
    last_button_was_operator = false;
    first_button_is_operator = true;
    EqualButton.disabled = true;

});










