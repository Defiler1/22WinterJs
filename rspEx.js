const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $myScore = document.querySelector("#myScore");
const $computerScore = document.querySelector("#computerScore");

const IMG_URL = "./rsp.png"; // 상대경로  기준 - 소스코드(rsp.js)의 경로
$computer.style.background = `url(${IMG_URL}) 0px 0`; // 가위
$computer.style.backgroundSize = "auto 200px";

const rspX = {
  scissors: "0",
  rock: "-220px",
  paper: "-440px",
};

let computerChoice = "scissors";

const changeComputerHand = () => {
  if (computerChoice === "rock") {
    computerChoice = "scissors";
  } else if (computerChoice === "scissors") {
    computerChoice = "paper";
  } else if (computerChoice === "paper") {
    computerChoice = "rock";
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
  //   settimeout(changeComputerHand, 50);
};
let intervalId = setInterval(changeComputerHand, 50); // // 50밀리초 0.05초
// clearTimeout(아이디)
clearInterval(intervalId); // setInterval 함수 취소

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let clickable = true;
let mScore = 0;
let cScore = 0;

const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    const myChoice =
      event.target.textContent === "바위"
        ? "rock"
        : event.target.textContent === "가위"
        ? "scissors"
        : "paper";
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;

    let message;

    if ([2, -1].includes(diff)) {
      console.log("승리");
      mScore += 1;
      message = "승리";
      if (mScore === 3) {
        alert("이겼습니다.");
        const retry = confirm("다시 하겠습니까?");
        if (retry) {
          mScore = 0;
          cScore = 0;
        } else {
          alert("게임을 종료합니다.");
          window.close();
        }
      }
    } else if (diff === -2 || diff === 1) {
      console.log("패배");
      cScore += 1;
      message = "패배";
      if (cScore === 3) {
        alert("졌습니다.");
        const retry = confirm("다시 하겠습니까?");
        if (retry) {
          mScore = 0;
          cScore = 0;
        } else {
          alert("게임을 종료합니다.");
          window.close();
        }
      }
    } else {
      console.log("무승부");
      message = "무승부";
    }

    $myScore.textContent = `${message} 총: ${mScore}점`;
    $computerScore.textContent = `${message} 총: ${cScore}점`;

    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
