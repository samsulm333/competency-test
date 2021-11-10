function drawImage(number) {
  let string = "";
  if (number % 2 == 0) {
    return console.log("Please Input Odd number");
  }
  for (let i = 0; i < number; i++) {
    for (j = 0; j < number; j++) {
      if (
        (i == 0 && j == 0) ||
        (i == 0 && j == number - 1) ||
        (i == 0 && j == Math.floor(number / 2)) ||
        (i == number - 1 && j == 0) ||
        (i == number - 1 && j == number - 1) ||
        (i == number - 1 && j == Math.floor(number / 2))
      ) {
        string += " * ";
      } else if (
        i > 0 &&
        i !== Math.floor(number / 2) &&
        j == Math.floor(number / 2)
      ) {
        string += " * ";
      } else if (i == Math.floor(number / 2) && j !== Math.floor(number / 2)) {
        string += " * ";
      } else {
        string += " # ";
      }
    }
    string += "\n";
  }
  console.log(string);
}

drawImage(9);
