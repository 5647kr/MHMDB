fetch("./index.json")
  .then((response) => {
    return response.json();
  })
  .then((array) => {
    Data(array);
  });

function Data(array) {
  const monsterData = array[0].bigMonster;
  const typeData = array[1].typeList;
  const seriesData = array[2].workList;
  const monsterList = document.querySelector(".monster-list");
  const typeList = document.querySelector(".type-list");
  const seriesList = document.querySelector(".work-list");

  // element 생성 함수
  function createLi() {
    return document.createElement("li");
  }
  function createInput() {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    return checkBox;
  }
  function createLabel() {
    return document.createElement("label");
  }

  // 몬스터 카드 생성
  monsterData.forEach((monster) => {
    const cardItem = createLi();
    const cardWrap = document.createElement("div");
    cardWrap.classList.add("monster-card");

    const cardContent = `
      <img src="${monster.imgurl}">
      <strong>${monster.name}</strong>
    `;

    cardWrap.innerHTML = cardContent;
    cardItem.appendChild(cardWrap);
    monsterList.appendChild(cardItem);

    // 카드 상세 내용 마우스이벤트
    cardWrap.addEventListener("mouseenter", () => {
      const cardDetailWrap = document.createElement("div");
      cardDetailWrap.classList.add("detail");
      cardDetailWrap.innerHTML = `
        <h3><span>종별: </span>${monster.type}</h3>
        <h3><span>종: </span>${monster.speices}</h3>
        <h3><span>이름: </span>${monster.name}</h3>
        <h3><span>별명: </span>${monster.nickname}</h3>
        <h3><span>등장 작품: </span>${monster.series}</h3>
      `;
      cardWrap.appendChild(cardDetailWrap);
    });

    cardWrap.addEventListener("mouseleave", () => {
      const cardDetailWrap = cardWrap.querySelector(".detail");
      cardWrap.removeChild(cardDetailWrap);
    });
  });

  // type radio 생성
  typeData.forEach((type) => {
    const typeItem = createLi();

    const typeCheckBox = createInput();
    const checkBoxLabel = createLabel();

    typeCheckBox.id = type.type;
    typeCheckBox.checked = true;
    typeCheckBox.disabled = true;

    checkBoxLabel.textContent = type.type;
    checkBoxLabel.htmlFor = type.type;

    typeList.appendChild(typeItem);
    typeItem.appendChild(typeCheckBox);
    typeItem.appendChild(checkBoxLabel);
  });

  // series radio 생성
  seriesData.forEach((series) => {
    const seriesItem = createLi();
    const seriesCheckBox = createInput();
    const checkBoxLabel = createLabel();
    const seriesAbbr = document.createElement("abbr");

    seriesCheckBox.id = series.work;
    seriesCheckBox.checked = true;
    seriesCheckBox.disabled = true;

    checkBoxLabel.htmlFor = series.work;

    seriesAbbr.title = series.fullName;
    seriesAbbr.textContent = series.work;

    seriesList.appendChild(seriesItem);
    seriesItem.appendChild(seriesCheckBox);
    seriesItem.appendChild(checkBoxLabel);
    checkBoxLabel.appendChild(seriesAbbr);
  })
}
