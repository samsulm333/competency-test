let arr = [20, 5, 12, 35, 11, 100, 17, 9, 58, 23, 69, 21];

function bubbleSort() {
  for (let i = 0; i < arr.length / 2; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // temp = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = temp;
      }
    }
    console.log(`Proses ke-${i + 1} : ${arr}`);
  }
  console.log(`Final result : ${arr}`);
}

bubbleSort();
