const arr = [1, "hello", null, undefined, false];

let some = false;
arr.forEach((value) => {
  if (value === null) {
    some = true;
  }
});
console.log(some); // true

const some = arr.some((value) => value === null);
// some은 하나라도 조건을 만조가는 요소를 찾으면 반복을 중단하는 메서드
console.log(some); // true
