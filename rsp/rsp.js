const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $score = document.querySelector("#score");
const IMG_URL = "./rsp.png"; // 상대경로  기준 - 소스코드(rsp.js)의 경로
// "C:\Users\64303\OneDrive\바탕 화면\22WinterJs\rsp.png"   // 절대경로
$computer.style.background = `url(${IMG_URL}) 0px 0`; // 가위
// $computer.style.background = `url(${IMG_URL}) -220px 0`; // 바위
// $computer.style.background = `url(${IMG_URL}) -440px 0`; // 보
$computer.style.backgroundSize = "auto 200px";
// const scissorsX = "-0";
// const rockX = "-220";
// const paperX = "-440";

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
// settimeout(changeComputerHand, 50);
let intervalId = setInterval(changeComputerHand, 50); // // 50밀리초 0.05초
// clearTimeout(아이디)
clearInterval(intervalId); // setInterval 함수 취소

// 그림이 멈춰있는 동안 버튼을 클릭해도 함수호출 안됨
// const clickButton = () => {
//   clearInterval(intervalId);
//   $rock.removeEventListener("click", clickButton);
//   $scissors.removeEventListener("click", clickButton);
//   $paper.removeEventListener("click", clickButton);

//   // 점수계산 및 화면표시
//   setTimeout(() => {
//     $rock.addEventListener("click", clickButton);
//     $scissors.addEventListener("click", clickButton);
//     $paper.addEventListener("click", clickButton);
//     intervalId = setInterval(changeComputerHand, 50);
//   }, 1000); // 호출하고 1초 후 실행
// };

// $rock.addEventListener("click", clickButton);
// $scissors.addEventListener("click", clickButton);
// $paper.addEventListener("click", clickButton);

// 함수호출 해도 함수가 아무일도 하지 않음
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let clickable = true;
let score = 0;

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
    //  if (diff === 2 || diff === -1)
    let message;
    if ([2, -1].includes(diff)) {
      console.log("승리");
      score += 1;
      message = "승리";
    } else if (diff === -2 || diff === 1) {
      console.log("패배");
      score -= 1;
      message = "패배";
    } else {
      console.log("무승부");
      message = "무승부";
    }

    $score.textContent = `${message} 총: ${score}점`;

    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
