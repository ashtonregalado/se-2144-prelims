expression = "10+5-4/2*3"; #should equal 9
inputted_numbers = ["5", "+", "3", "*", "4","/", "8", "-", "2", "/", "5"] 

# print(len(expression))
# print(len("".join(inputted_numbers)))

for index, i in enumerate(inputted_numbers):
    if i == "*":
        product = float(inputted_numbers[index-1]) * float(inputted_numbers[index+1])
        inputted_numbers = inputted_numbers[ : index-1] + [float(product)] + inputted_numbers[index + 2 : ]
        

print(inputted_numbers)
