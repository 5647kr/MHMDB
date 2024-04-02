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
  const allList = document.querySelector(".all-list");

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
    <p class="a11y-hidden" id="type">${monster.type}</p>
    <p class="a11y-hidden" id="series">${monster.seriesId}</p>
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

  // type checkbox 생성
  typeData.forEach((type) => {
    const typeItem = createLi();

    const typeCheckBox = createInput();
    const checkBoxLabel = createLabel();

    typeCheckBox.id = type.type;

    checkBoxLabel.textContent = type.type;
    checkBoxLabel.htmlFor = type.type;

    typeList.appendChild(typeItem);
    typeItem.appendChild(typeCheckBox);
    typeItem.appendChild(checkBoxLabel);
  });

  // series checkbox 생성
  seriesData.forEach((series) => {
    const seriesItem = createLi();
    const seriesCheckBox = createInput();
    const checkBoxLabel = createLabel();
    const seriesAbbr = document.createElement("abbr");

    seriesCheckBox.id = series.id;

    checkBoxLabel.htmlFor = series.id;

    seriesAbbr.title = series.fullName;
    seriesAbbr.textContent = series.work;

    seriesList.appendChild(seriesItem);
    seriesItem.appendChild(seriesCheckBox);
    seriesItem.appendChild(checkBoxLabel);
    checkBoxLabel.appendChild(seriesAbbr);
  });

  // type 필터링 기능
  const typeCheck = document.querySelectorAll(".type-list input");

  typeCheck.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.addEventListener("click", (e) => {
      const cardType = document.querySelectorAll(
        ".monster-list li .monster-card #type"
      );
      cardType.forEach((card) => {
        const typeCheckList = card.closest("li");

        if (checkbox.checked && e.target.id === card.textContent) {
          typeCheckList.style.display = "block";
        } else if (!checkbox.checked && e.target.id === card.textContent) {
          typeCheckList.style.display = "none";
        }
      });
    });
  });

  // series 필터링 기능
  const seriesCheck = document.querySelectorAll(".work-list input");

  seriesCheck.forEach((checkbox) => {
    console.log(checkbox);
    checkbox.disabled = true;
  });
}
