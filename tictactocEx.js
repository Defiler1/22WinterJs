const { body } = document;
// 구조분해 할당
// 객체 내부의 속성과 할당하는 변수명이 같을 때 사용
// const body = document.body
// 예)
// const obj = {a: 1, b: 2}
// const { a, b } = obj 아래의 두줄을 한줄로 표현
// const a = obj.a
// const b = obj.b
const $table = document.createElement("table");
const $result = document.createElement("div");
const rows = [];
let turn = "O";

const checkWinner = (target) => {
  //   let rowIndex;
  //   let cellIndex;
  const rowIndex = target.parentNode.rowIndex;
  // target은 td이니 parentNode - tr
  // parentNode 의 반대개념 - children
  // tr 태그는 rowIndex라는 속성을 제공
  const cellIndex = target.cellIndex;
  // td 태그는 cellIndex라는 속성을 제공
  //   rows.forEach((row, ri) => {
  //     row.forEach((cell, ci) => {
  //       if (cell === target) {
  //         rowIndex = ri;
  //         cellIndex = ci;
  //       }
  //     });
  //   });
  // 세 칸 다 채워졌나
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

const callback = (event) => {
  if (event.target.textContent !== "") {
    console.log("빈칸이 아닙니다.");
    return;
  } else {
    console.log("빈칸입니다.");
    event.target.textContent = turn;
    const hasWinner = checkWinner(event.target);
    if (hasWinner) {
      $result.textContent = `${turn}님이 승리!`;
      $table.removeEventListener("click", callback);
      return;
    }
    // 승자가 없으면
    //  let draw = true;
    //  rows.forEach((row) => {
    //    row.forEach((cell) => {
    //      if (!cell.textContent) {
    //        draw = false;
    //      }
    //    });
    //  });
    const draw = rows.flat().every((cell) => cell.textContent);
    // every() 메서드는 요소를 순회하면서 조건 함수의 반환값이 모두 true이면 every메서드도 true를 리턴
    if (draw) {
      $result.textContent = "무승부";
      $table.removeEventListener("click", callback);
      return;
    }
    turn = turn === "X" ? "O" : "X";
    //  turn = if (turn === 'X') {
    //     return 'O'
    //  } else {
    //     return 'X'
    //  }
  }
};

for (let i = 1; i <= 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const $td = document.createElement("td");
    //  $td.addEventListener("click", callback);
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
  $table.addEventListener("click", callback);
  // 이벤트 버블링 (event bubbling)
}
// console.log(rows);
body.appendChild($table);
body.appendChild($result);
