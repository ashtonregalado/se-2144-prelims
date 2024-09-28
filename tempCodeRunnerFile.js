let inputted_numbers = ["2", "/", "1", "*", "2"]

// First, perform multiplication and division
let index = 0;
while (index < inputted_numbers.length) {
    if (inputted_numbers[index] === "*") {
        let product = parseFloat(inputted_numbers[index - 1]) * parseFloat(inputted_numbers[index + 1]);
        inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2));
        index = 0; // reset to handle more operations from the beginning
    } else if (inputted_numbers[index] === "/") {
        let product = parseFloat(inputted_numbers[index - 1]) / parseFloat(inputted_numbers[index + 1]);
        inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2));
        index = 0; // reset to handle more operations from the beginning
    } else {
        index += 1;
    }
}

console.log("After multiplication and division:", inputted_numbers);

// Now, perform addition and subtraction
index = 0;
while (index < inputted_numbers.length) {
    if (inputted_numbers[index] === "+") {
        let product = parseFloat(inputted_numbers[index - 1]) + parseFloat(inputted_numbers[index + 1]);
        inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2));
        index = 0; // reset to handle more operations from the beginning
    } else if (inputted_numbers[index] === "-") {
        let product = parseFloat(inputted_numbers[index - 1]) - parseFloat(inputted_numbers[index + 1]);
        inputted_numbers = inputted_numbers.slice(0, index - 1).concat([product.toString()], inputted_numbers.slice(index + 2));
        index = 0; // reset to handle more operations from the beginning
    } else {
        index += 1;
    }
}

console.log("After addition and subtraction:", inputted_numbers);

// The final answer will be the first element of the modified list
let answer = parseFloat(inputted_numbers[0]);
console.log("Final answer:", answer);
