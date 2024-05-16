let checkList = [
  "갑각종",
  "갑충종",
  "비룡종",
  "사룡종",
  "수룡종",
  "아룡종",
  "아수종",
  "양서종",
  "어룡종",
  "조룡종",
  "해룡종",
  "협각종",
  "고룡종"
];

fetch("./index.json")
  .then((response) => {
    return response.json();
  })
  .then((array) => {
    Data(array);
  });

function Data(array) {
  // Data 변수설정
  const monsterData = array[0].monster;
  const speciesData = array[1].speciesList;
  const seriesData = array[2].seriesList;

  // species, series BtnList, cardList
  const btnSection = document.querySelector("#btnSection");
  const cardSection = document.querySelector("#cardSection");

  // species btn 생성
  speciesData.map((species) => {
    const speciesList = btnSection.querySelector(".species");
    const speciesItem = document.createElement("li");
    const speciesBtn = document.createElement("button");

    speciesBtn.textContent = species.type;

    speciesItem.appendChild(speciesBtn);
    speciesList.appendChild(speciesItem);
  })


  // series btn 생성
  seriesData.map((series) => {
    const seriesList = btnSection.querySelector(".series");
    const seriesItem = document.createElement("li");
    const seriesBtn = document.createElement("button");
    const seriesAbbr = document.createElement("abbr");

    seriesAbbr.title = series.fullName
    seriesAbbr.textContent = series.work;
    seriesBtn.id = series.id;

    seriesBtn.appendChild(seriesAbbr);
    seriesItem.appendChild(seriesBtn);
    seriesList.appendChild(seriesItem);
  })


  // monster card 생성
  monsterData.map((monster) => {
    const cardList = cardSection.querySelector(".cardList");
    const cardItem = document.createElement("li");
    const card = document.createElement("div");
    const cardContent = `
    <h4>${monster.name}</h4>
    <img src="${monster.icon}" alt="${monster.name}">
    <div class="cardContent">
    <p>몬스터 이명</p>
    <p>${monster.type}</p>
    <p>${monster.small} - ${monster.large}</p>
    <div></div>
    <div></div>
    </div>
    `
    card.classList.add("card");

    card.innerHTML = cardContent;
    cardItem.appendChild(card);
    cardList.appendChild(cardItem);
    
    // 카드 내부 속성아이콘 설정
    const elementWrap = card.querySelector(".cardContent div");

    if(monster.element !== "") {
      monster.element.split(",").map((element) => {
        const elementImg = document.createElement("img");

        elementImg.src = `./icon/속성상태/${element.trim()}.webp`;
        elementImg.alt = element.trim();

        elementWrap.appendChild(elementImg);
      })
    }

    // 카드 내부 속성아이콘 설정
    const ailmentWrap = card.querySelector(".cardContent div:last-child");

    if(monster.ailment !== "") {
      monster.ailment.split(",").map((ailment) => {
        const ailmentImg = document.createElement("img");

        ailmentImg.src = `./icon/속성상태/${ailment.trim()}.webp`;
        ailmentImg.alt = ailment.trim();

        ailmentWrap.appendChild(ailmentImg);
      })
    }

    // 카드 간판img 설정

    if(monster.sign !== "") {
      console.log(monster.sign)
      const signImg = document.createElement("img");
      
      signImg.classList.add("signImg");

      signImg.src = `./간판/${monster.sign}.webp`;
      signImg.alt = "간판 몬스터";

      cardItem.appendChild(signImg);
    }
  })




}