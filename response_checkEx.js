const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
const $span = document.querySelector("#adsf");

let startTime;
let endTime;
const records = [];
let timeoutId;

$screen.addEventListener("click", function () {
  if ($screen.classList.contains("waiting")) {
    // $screen에 waiting이란 클래스가 있으면 true 없으면 false
    // $screen.classList.remove("waiting");
    // $screen.classList.add("ready");
    $screen.classList.replace("waiting", "ready");
    $screen.textContent = "초록색이 되면 클릭하세요.";
    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.replace("ready", "now");
      $screen.textContent = "클릭하세요!";
    }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
  } else if ($screen.classList.contains("ready")) {
    clearTimeout(timeoutId);
    $screen.classList.replace("ready", "waiting");
    $screen.prepend(`너무 성급하시군요!`, document.createElement("br"));
    // prepend() - 선택한 요소 내부의 시작 부분에 삽입
    // append() - 선택한 요소 내부의 끝 부분에 삽입
  } else if ($screen.classList.contains("now")) {
    endTime = new Date();
    const timeGap = endTime - startTime;
    records.push(timeGap);
    const avg = records.reduce((a, c) => a + c) / records.length;
    // 배열.reduce((누적값, 현잿값) => {return 새로운 누적값}, 초깃값)
    // 배열의 값들을 하나의 새로운 값으로 합치는 메서드
    // 초기값이 없으면 배열의 첫 번째 요소가 초기값
    // 초기값 -> 누적값
    // 마지막으로 반환되는 값이 결과값
    $result.textContent = `현재: ${timeGap.toFixed(1)}ms, 평균: ${avg.toFixed(
      1
    )}ms`;
    startTime = null;
    endTime = null;
    $screen.classList.replace("now", "waiting");
    $screen.textContent = "클릭해서 시작하세요.";
  }
});
