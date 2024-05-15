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
    <p>몬스터<br>속성</p>
    <p>속성피해<br>상태이상</p>
    </div>
    `
    card.classList.add("card");

    card.innerHTML = cardContent;
    cardItem.appendChild(card);
    cardList.appendChild(cardItem);
  })





}