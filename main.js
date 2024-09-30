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


HelloButton.addEventListener("click", (event) => {
    let randon_greeting = greetings[(Math.floor(Math.random() * greetings.length))];
    CalculatorScreen.value = randon_greeting;
});


ByeButton.addEventListener("click", (event) => {
    CalculatorScreen.value = "Goodbye";
    AllButtons.forEach(button => {
        if (button !== AcButton){
            button.disabled = true;
        }
    });
});


DelButton.addEventListener("click", (event) => {
    const lastChar = expression.slice(-1); 

    if (["+", "-", "×", "÷"].includes(lastChar)) {
        last_button_was_operator = false; 
    };

    current_input = current_input.slice(0, -1); 
    expression = expression.slice(0, -1);       

    if (inputted_numbers.length > 0) {
        const lastInputIndex = inputted_numbers.length - 1;
        const lastInput = inputted_numbers[lastInputIndex];

        if (expression.length < inputted_numbers.join("").length) {
            inputted_numbers[lastInputIndex] = lastInput.slice(0, -1);

            if (inputted_numbers[lastInputIndex] === "") {
                inputted_numbers.pop();
            };
        };
    };

    if (expression === "") {
        first_button_is_operator = false;
    } else {
        first_button_is_operator = true;
    };
    
    HandleInputLimit();
});


AcButton.addEventListener("click", (event) => {
    AllButtons.forEach(button => {
        button.disabled = false;
    })
    
    current_input = "";
    answer = 0;
    expression = "";
    inputted_numbers = [];
    last_button_was_operator = false;
    first_button_is_operator = false;
    CalculatorScreen.value = "";
});

const HandleNumberButtons = (num) => {
    if (expression.length >=16) return;

    if (expression === String(answer)) {
        expression = "";
    };

    if (answer === parseFloat(inputted_numbers[0]) && inputted_numbers.length === 1) {
        inputted_numbers.splice(0,1);
    };


    current_input += num;
    expression += num;
    last_button_was_operator = false;
    first_button_is_operator = true;
    HandleInputLimit();
};


[ZeroButton, OneButton, TwoButton, ThreeButton, FourButton, FiveButton, SixButton, SevenButton, EightButton, NineButton].forEach((button, index) => {
    button.addEventListener("click", () => HandleNumberButtons(index.toString()));
});


PeriodButton.addEventListener("click", (event) => {
    if (expression.length >=16) return;

    last_button_was_operator = true;

    if (!current_input.includes(".")) {
        current_input += ".";
        expression += ".";
    };
    
    first_button_is_operator = true;

    HandleInputLimit();
});


MultiplyButton.addEventListener("click", (event) => {
    let signs = ["×", "÷", "+", "-"]
    if (expression.length >=16) return;

    if (last_button_was_operator) return;

    if (!first_button_is_operator) return;

    if (current_input === "") {
        if (signs.every((sign) => !expression.includes(sign))) {
            
        } 
    } else {
        inputted_numbers.push(current_input);
    };

    expression += "×" ;
    inputted_numbers.push("×");
    current_input = "" ;
    last_button_was_operator = true;
    first_button_is_operator = true;
    EqualButton.disabled = false;
    HandleInputLimit();
})


AddButton.addEventListener("click", (event) => {
    let signs = ["×", "÷", "+", "-"];

    if (expression.length >=16) return;

    if (last_button_was_operator) return;

    if (!first_button_is_operator) return;
    
    if (current_input === "") {
        if (signs.every((sign) => !expression.includes(sign))) {

        } 
    } else {
        inputted_numbers.push(current_input);
    };

    PeriodButton.disabled = false
    expression += "+";
    inputted_numbers.push("+");
    current_input = "";
    last_button_was_operator = true;
    first_button_is_operator = true;
    EqualButton.disabled = false;
    HandleInputLimit();

});


SubtractButton.addEventListener("click", (event) => {
    let signs = ["×", "÷", "+", "-"];

    if (expression.length >=16) return;

    if (last_button_was_operator) return;

    if (current_input === "") {
        if (signs.every((sign) => !expression.includes(sign))) {
            
        } 
    } else {
        inputted_numbers.push(current_input);
    };
    
    expression += "-";
    inputted_numbers.push("-");
    current_input = "";
    last_button_was_operator = true;
    EqualButton.disabled = false;
    HandleInputLimit();

});


DivideButton.addEventListener("click", (event) => {
    let signs = ["×", "÷", "+", "-"];

    if (expression.length >=16) return;

    if (last_button_was_operator) return;

    if (!first_button_is_operator) return;

    if (current_input === "") {
        if (signs.every((sign) => !expression.includes(sign))) {

        };

    } else {
        inputted_numbers.push(current_input);
    };
    
    expression += "÷";
    inputted_numbers.push("÷");
    current_input = "";
    last_button_was_operator = true;
    first_button_is_operator = true;
    EqualButton.disabled = false;
    HandleInputLimit();
});


const CalculateResults = () => {
    let index = 0;

    while (index < inputted_numbers.length) {
        if (inputted_numbers[index] === "×") {
            let product = parseFloat(inputted_numbers[index - 1]) * parseFloat(inputted_numbers[index + 1]);
            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2));
            index = 0; 

        } else if (inputted_numbers[index] === "÷") {
            let quotient = parseFloat(inputted_numbers[index - 1]) / parseFloat(inputted_numbers[index + 1]);

            if (!isFinite(quotient)) {
                CalculatorScreen.value = "Can't divide by zero!";

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

            inputted_numbers = inputted_numbers.slice(0, index - 1).concat([quotient.toString()], inputted_numbers.slice(index + 2));
            index = 0; 
            
        } else {
            index += 1;
        };
    };

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
    
    answer = parseFloat(inputted_numbers[0]);
    CalculatorScreen.value = answer.toString();
};


EqualButton.addEventListener("click", (event) => {
    if (inputted_numbers.length === 0) {
        CalculatorScreen.value = current_input;

    }else {

        if (current_input !== "") {
            inputted_numbers.push(current_input); 
        };
        
        if (inputted_numbers.includes("")) {
            inputted_numbers = inputted_numbers.filter(num => num !== "");
        };

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

        if (inputted_numbers.length >= 2 && inputted_numbers[0] === "-" && !isNaN(inputted_numbers[1])) {
            inputted_numbers = [inputted_numbers[0] + inputted_numbers[1]].concat(inputted_numbers.slice(2));
        };

        for (let i = 0; i < inputted_numbers.length; i++) {

            if (i < inputted_numbers.length - 1 && !isNaN(inputted_numbers[i]) && !isNaN(inputted_numbers[i + 1])) {
                new_inputted_numbers.push(inputted_numbers[i] + inputted_numbers[i + 1]);
                i++; 

            } else {
                new_inputted_numbers.push(inputted_numbers[i]);
            };
        };

        inputted_numbers = new_inputted_numbers;

        CalculateResults();

        current_input = "" ;
        expression = "" ;
        expression = answer.toString();
        last_button_was_operator = false;
        first_button_is_operator = true;
        EqualButton.disabled = true;
    };
});










