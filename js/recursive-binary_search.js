function findMax(data, start, end) {
  if (start >= end) {
    return data[start];
  }

  const middle = Math.floor((start + end) / 2);
  const max1 = findMax(data, start, middle);
  const max2 = findMax(data, middle + 1, end);

  return Math.max(max1, max2);
}

// const arr = [13, 2, 41, 23, 1, 33, 23, 12, 9];
const arr = Array(10000000)
  .fill(null)
  .map((_, i) => i + 1);
// console.log(findMax(arr, 0, arr.length - 1));

function search(data, start, end, target) {
  if (start > end) {
    return -1;
  }

  if (data[start] === target) {
    return start;
  }

  return search(data, start + 1, end, target);
}

function binarySearch(data, start, end, target) {
  if (start > end) {
    return -1;
  }

  const middle = Math.floor((start + end) / 2);

  const compareData = data[middle];
  if (compareData === target) {
    return middle;
  } else if (target < compareData) {
    return binarySearch(data, start, middle - 1, target);
  } else if (target > compareData) {
    return binarySearch(data, middle + 1, end, target);
  }
}
const current = Date.now();
console.log(search(arr, 0, arr.length - 1, 500));
console.log(Date.now() - current + "ms");

const current2 = Date.now();
console.log(binarySearch(arr, 0, arr.length - 1, 5500000));
console.log(Date.now() - current2 + "ms");
