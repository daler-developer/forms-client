function incrementBinaryNum(binaryNum) {
  for (let i = binaryNum.length - 1; i >= 0; i--) {
    const isFirstDigit = i === 0;

    if (binaryNum[i] === "0") {
      binaryNum = binaryNum.slice(0, i) + "1" + binaryNum.slice(i + 1);
      break;
    } else if (binaryNum[i] === "1") {
      if (isFirstDigit) {
        binaryNum = "1" + binaryNum.slice(0, i) + "0" + binaryNum.slice(i + 1);
      } else {
        binaryNum = binaryNum.slice(0, i) + "0" + binaryNum.slice(i + 1);
      }
    }
  }

  return binaryNum;
}

function convertFromBinaryToDecimal(binaryNum) {
  let result = 0;

  let temp = "0";

  while (true) {
    if (temp === binaryNum) {
      break;
    }

    temp = incrementBinaryNum(temp);
    result++;
  }

  return result;
}

function calculate(num1, num2) {
  return convertFromBinaryToDecimal(num1) + convertFromBinaryToDecimal(num2);
}

const result = calculate("11", "10");

// console.log(result)
