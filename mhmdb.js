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

  // species, series BtnList
  const btnSection = document.querySelector("#btnSection");
  const seriesBtn = btnSection.querySelector(".series");

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








}