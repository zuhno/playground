import DUMMY_DATA from "./dummy.data.json" with { type: "json" };

function merge(array, tempArray, left, mid, right) {
  // 임시 배열에 복사
  for (let i = left; i <= right; i++) {
    tempArray[i] = array[i];
  }

  let i = left; // 왼쪽 부분 배열 시작 인덱스
  let j = mid + 1; // 오른쪽 부분 배열 시작 인덱스
  let k = left; // 결과 배열 인덱스

  // 두 부분 배열을 비교하며 병합
  while (i <= mid && j <= right) {
    if (tempArray[i] <= tempArray[j]) {
      array[k++] = tempArray[i++];
    } else {
      array[k++] = tempArray[j++];
    }
  }

  // 왼쪽 부분 배열에 남은 요소가 있으면 복사
  while (i <= mid) {
    array[k++] = tempArray[i++];
  }

  // 오른쪽 부분 배열은 이미 올바른 위치에 있으므로 복사 불필요
}

function sort(array, tempArray, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  // 분할
  sort(array, tempArray, left, mid);
  sort(array, tempArray, mid + 1, right);

  // 병합
  merge(array, tempArray, left, mid, right);
}

function mergeSort(arr) {
  // 임시 작업 배열을 한 번만 생성
  const temp = new Array(arr.length);

  // 원본 배열을 복사하여 정렬
  const result = [...arr];
  sort(result, temp, 0, result.length - 1);
  return result;
}

// 테스트
const arr = Array.from({ length: 100 }).reduce((acc)=> {acc.push(...DUMMY_DATA); return acc;}, []);
console.time("merge sort");
const sortedArray = mergeSort(arr);
console.timeEnd("merge sort");
// console.log(sortedArray);
