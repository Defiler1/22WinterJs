const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterNmae = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      {
        name: "슬라임",
        hp: 25,
        att: 10,
        xp: 10,
      },
      {
        name: "스켈레톤",
        hp: 50,
        att: 15,
        xp: 20,
      },
      {
        name: "마왕",
        hp: 150,
        att: 35,
        xp: 50,
      },
    ];
    this.start(name);
  }
  start(name) {
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }

  changeScreen(screen) {
    if (screen === "start") {
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target["menu-input"].value;
    if (input === "1") {
      this.changeScreen("battle");
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === "2") {
    } else if (input === "3") {
    }
  };
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target["battle-input"].value;
    if (input === "1") {
    } else if (input === "2") {
    } else if (input === "3") {
    }
  };
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = "";
      $heroLevel.textContent = "";
      $heroHp.textContent = "";
      $heroXp.textContent = "";
      $heroAtt.textContent = "";
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterNmae.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterNmae.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(text) {
    $message.textContent = text;
  }
}

class Hero {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.lev = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.xp = 0;
    this.att = 0;
  }
  attack(target) {
    target.hp -= this.att;
  }

  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}

let game = null;

$startScreen.addEventListener("submit", (event) => {
  // submit을 하면 화면 새로고침이 되는데 preventDefault를 사용해 새로고침 막음
  event.preventDefault();
  const name = event.target["name-input"].value; // input에 입력한 값
  game = new Game(name);
  // $startScreen.style.display = "none";
  // $gameMenu.style.display = "block";
  // $heroName.textContent = name;
  // $heroLevel.textContent = `${hero.lev}Lev`;
  // $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  // $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  // $heroAtt.textContent = `ATT: ${hero.att}`;
  // hero.name = name;
});

// $gameMenu.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const input = event.target["menu-input"].value;
//   if (input === "1") {
//     $gameMenu.style.display = "none";
//     $battleMenu.style.display = "block";
//     monster = JSON.parse(
//       // parse - 문자열을 객체로
//       JSON.stringify(
//         // stringify - 객체를 문자열로
//         // parse + stringify메서드를 조합해서 사용하면 대상 객체를 깊은복사(deep copy) 할 수 있다.
//         monsterList[Math.floor(Math.random() * monsterList.length)]
//       )
//     );
//     monster.maxHp = monster.hp;
//     $monsterNmae.textContent = monster.name;
//     $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
//     $monsterAtt.textContent = `ATT: ${monster.att}`;
//     $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
//   } else if (input === "2") {
//   } else if (input === "3") {
//   }
//   const monster1 = JSON.parse(JSON.stringify(monsterList[0]));
//   // monster1에 monsterList[0]의 객체를 복사한 것
//   const monster2 = monsterList[0];
//   monster1.name = "새 몬스터";
//   console.log(monster1.name); // 새 몬스터
//   console.log(monsterList[0].name); // 슬라임
//   monster2.name = "새 몬스터";
//   console.log(monsterList[0].name); // 새 몬스터
//   console.log(monsterList[0] === monster1); // false 깊은 복사
//   console.log(monsterList[0] === monster2); // true 참조관계
// });
