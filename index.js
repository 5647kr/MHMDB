document.addEventListener("DOMContentLoaded", () => {
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

  const cardList = document.querySelectorAll(".monster-list li");
  cardList.forEach((cards) => {
    cards.style.display = "none"
  })

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
  const cardSeries = document.querySelectorAll(
    ".monster-list li .monster-card #series"
  );

  // 각 체크박스의 상태를 추적하기 위한 객체
  const checkboxStates = {};

  seriesCheck.forEach((checkbox) => {
    // 각 체크박스의 초기 상태 설정
    checkboxStates[checkbox.id] = false;

    checkbox.addEventListener("change", () => {
      // 해당 체크박스의 상태 업데이트
      checkboxStates[checkbox.id] = checkbox.checked;

      // 각 카드에 대해 필터링 조건을 다시 확인하여 처리
      cardSeries.forEach((card) => {
        const seriesCheckList = card.closest("li");
        let shouldBeVisible = false;

        // 각 체크박스의 상태에 따라 필터링 조건을 확인
        seriesCheck.forEach((checkbox) => {
          if (
            checkboxStates[checkbox.id] &&
            card.textContent.includes(checkbox.id)
          ) {
            shouldBeVisible = true;
          }
        });

        // 해당 카드의 표시 여부 결정
        seriesCheckList.style.display = shouldBeVisible ? "block" : "none";
      });
    });
  });

  // radio 필터 제한
  const typeRadio = document.querySelector(
    ".radio-wrap .radio-list .typeLi input"
  );
  const seriesRadio = document.querySelector(
    ".radio-wrap .radio-list .seriesLi input"
  );
  const card = document.querySelectorAll(".monster-list li");

  // typeRadio가 기본으로 체크되어 있을 때 seriesCheck의 모든 체크박스를 비활성화
  seriesCheck.forEach((checkbox) => {
    checkbox.disabled = true;
  });

  typeRadio.checked = true;

  typeRadio.addEventListener("click", () => {
    if (typeRadio.checked) {
      seriesCheck.forEach((checkbox) => {
        checkbox.disabled = true;
        checkbox.checked = false;
      });
      typeCheck.forEach((checkbox) => {
        checkbox.disabled = false;
        checkbox.checked = false;
      });
      card.forEach((cardLi) => {
        cardLi.style.display = "none";
      });
    }
  });

  seriesRadio.addEventListener("click", () => {
    if (seriesRadio.checked) {
      seriesCheck.forEach((checkbox) => {
        checkbox.disabled = false;
      });
      typeCheck.forEach((checkbox) => {
        checkbox.disabled = true;
        checkbox.checked = false;
      });
      card.forEach((cardLi) => {
        cardLi.style.display = "none";
      });
    }
  });
}
})