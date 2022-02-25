const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroMenu = document.querySelector("#hero-name");

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault(); // 페이지 새로고침 안함
  const name = event.target["name-input"].value;
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  $heroMenu.textContent = name;
});
