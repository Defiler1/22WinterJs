const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
// const $avg = document.querySelector("#avg");

let startTime;
let endTime;
const records = [];
let timeOut;

// contains('클래스') - 해당클래스가 들어있으면 true 아니면 false

$screen.addEventListener("click", function () {
  if ($screen.classList.contains("waiting")) {
    // 대기화면
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 클릭하세요";
    timeOut = setTimeout(() => {
      startTime = new Date();
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.textContent = "클릭하세요!";
    }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초
  } else if ($screen.classList.contains("ready")) {
    // 준비화면
    clearTimeout(timeOut);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 성급하시군요!";
  } else if ($screen.classList.contains("now")) {
    // 클릭화면
    endTime = new Date();
    const gap = endTime - startTime;
    records.push(gap);
    const average = records.reduce((a, c) => a + c) / records.length;
    //  배열.reduce((누적값, 현잿값) => {
    //     return 새로운 누적값
    //  }, 초기값)
    $result.textContent = `현재: ${gap}ms 평균: ${average}`;
    startTime = null;
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭해서 시작하세요.";
  }
});
