const $wrapper = document.querySelector("#wrapper");

const total = 12;
const colors = ["red", "orange", "yellow", "green", "white", "pink"];
let colorCopy = colors.concat(colors);
// array.concat()
// 파라미터로 받은 배열이나 값들을 기존의 배열에 합쳐서, 새로운 배열을 만들어서 리턴
let shuffled = [];
let clicked = [];
let completed = [];

function shuffle() {
  // 피셔 예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}
function onClickCard() {
  this.classList.toggle("flipped");
  // classList.toggle() 클래스의 유무를 체크해서 없으면 add, 있으면 remove를 자동으로 시켜줌
  clicked.push(this); // this - flipped된 카드 event.target
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector(".card-back").style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    // 두 카드가 색이 같으면
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) {
      return;
    }
    setTimeout(() => {
      alert("축하합니다!");
      resetGame();
    }, 1000);
    return;
  }
  // 두 카드가 다르면
  setTimeout(() => {
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
  }, 500);
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }
  document.querySelectorAll(".card").forEach((card, index) => {
    // 초반카드 공개
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    // 카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    });
  }, 5000);
}

function resetGame() {
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}

startGame();

// p402
