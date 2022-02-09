const { body } = document;
// const body = document.body;
const $table = document.createElement("table");
const $result = document.createElement("div"); // 결과창
const rows = [];

for (let i = 1; i <= 5; i++) {
  const $tr = document.createElement("tr"); // 행
  const cells = [];
  for (let j = 1; j <= 4; j++) {
    const $td = document.createElement("td");
    cells.push($td); // 열
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
}
body.appendChild($table);
body.appendChild($result);
