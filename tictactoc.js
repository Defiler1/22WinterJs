const { body } = document;
// const body = document.body;
const $table = document.createElement("table");
const $result = document.createElement("div"); // 결과창
const rows = [];
let turn = "O";

const checkWinner = (target) => {
  let rowIndex;
  let cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
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
    // 칸이 이미 채워져 있는가
    console.log("빈칸이 아닙니다.");
  } else {
    console.log("빈칸입니다.");
    event.target.textContent = turn;
    const hasWinner = checkWinner(event.target);
    // 승자가 있으면
    if (hasWinner) {
      $result.textContent = `${turn}님이 승리!`;
      $table.removeEventListener("click", callback);
      return;
    }
    // 승자가 없으면
    turn = turn === "X" ? "O" : "X";
    // if (turn === "X") {
    //   turn = "O";
    // } else {
    //   turn = "X";
    // }
  }
};

for (let i = 1; i <= 3; i++) {
  const $tr = document.createElement("tr"); // 행
  const cells = []; // inner
  for (let j = 1; j <= 3; j++) {
    const $td = document.createElement("td");
    // $td.addEventListener("click", callback);
    cells.push($td); // 열
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
  $table.addEventListener("click", callback);
}
body.appendChild($table);
body.appendChild($result);

// const obj = { a: 1, b: 2 };
// const { a, b } = obj;
// const a = obj.a;
// const b = obj.b;
