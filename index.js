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
    const btnList = document.querySelector(".btn-list");
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
      const cardInner = document.createElement("div");
      const cardIntro = document.createElement("div");
      cardWrap.classList.add("monster-card");
      cardInner.classList.add("monster-inner");
      cardIntro.classList.add("monster-intro");

      const cardContent = `
    <img src="${monster.imgurl}">
    <strong>${monster.name}</strong>
    <p class="a11y-hidden" id="type">${monster.type}</p>
    <p class="a11y-hidden" id="series">${monster.seriesId}</p>
    `;

      const cardDetailWrap = document.createElement("div");
      cardDetailWrap.classList.add("detail");

      cardDetailWrap.innerHTML = `
      <h3><span>종별: </span>${monster.type}</h3>
      <h3><span>종: </span>${monster.speices}</h3>
      <h3><span>이름: </span>${monster.name}</h3>
      <h3><span>별명: </span>${monster.nickname}</h3>
      <h3><span>등장 작품: </span>${monster.series}</h3>
    `;

      cardIntro.innerHTML = cardContent;
      cardInner.appendChild(cardIntro);
      cardWrap.appendChild(cardInner);
      cardItem.appendChild(cardWrap);
      monsterList.appendChild(cardItem);

      cardInner.appendChild(cardDetailWrap);

      // 카드 클릭 이벤트
      cardWrap.addEventListener("click", () => {
        cardWrap.classList.toggle("flipped");
      });
    });

    //! card 초기설정 삭제 가능성
    const cards = document.querySelectorAll(".monster-list li");

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

    // btn 생성
    const typeBtn = document.createElement("button");
    btnList.appendChild(typeBtn);
    typeBtn.value = "true";
    typeBtn.textContent = "전체 해제";

    const seriesBtn = document.createElement("button");
    btnList.appendChild(seriesBtn);
    seriesBtn.value = "true";
    seriesBtn.textContent = "전체 선택";

    // 체크id 초기설정
    let checkedIds = [
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
      "고룡종",
    ];

    // typeBtn event 처리
    typeBtn.addEventListener("click", () => {

      if (typeBtn.value === "true") {
        typeBtn.value = "false";
        typeBtn.textContent = "전체 선택";

        typeCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        cards.forEach((card) => {
          card.style.display = "none";
        });

        checkedIds = [];
      } else {
        typeBtn.value = "true";
        typeBtn.textContent = "전체 해제";

        typeCheck.forEach((checkbox) => {
          checkbox.checked = true;
        });

        seriesBtn.value = "true";
        seriesBtn.textContent = "전체 선택";

        seriesCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        cards.forEach((card) => {
          card.style.display = "block";
        });

        checkedIds = [
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
          "고룡종",
        ];
      }
    });
    // seriesBtn 이벤트 처리
    seriesBtn.addEventListener("click", () => {
      if (seriesBtn.value === "true") {
        seriesBtn.value = "false";
        seriesBtn.textContent = "전체 해제";

        seriesCheck.forEach((checkbox) => {
          checkbox.checked = true;
        });

        typeBtn.value = "false";
        typeBtn.textContent = "전체 선택";

        typeCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        cards.forEach((card) => {
          card.style.display = "block";
        });

        checkedIds = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
        ];
      } else {
        seriesBtn.value = "true";
        seriesBtn.textContent = "전체 선택";

        seriesCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        typeCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        cards.forEach((card) => {
          card.style.display = "none";
        });

        checkedIds = [];
      }
    });

    // 필터링 함수
    function refreshCards() {
      //for each card
      for (let card of document.querySelectorAll(".monster-list li")) {
        //hide the card
        card.style.display = "none";
        //for each checked id
        for (let id of checkedIds) {
          //if the current card contains the current id
          if (card.textContent.includes(id)) {
            //show the card
            card.style.display = "block";
            //and exit the loop and skip to the next card
            break;
          }
        }
      }
    }

    // 체크박스와 카드 종류별 선언문
    const typeCheck = document.querySelectorAll(".type-list input");

    const seriesCheck = document.querySelectorAll(".work-list input");

    // type 필터링 기능
    typeCheck.forEach((checkbox) => {
      checkbox.checked = true;
      checkedIds = [];

      // 체크박스 하나라도 checked가 아닌 경우
      if (!checkbox.checked) {
        typeBtn.value = "false";
        typeBtn.textContent = "전체 선택";
      } else {
        typeBtn.value = "true";
        typeBtn.textContent = "전체 해제";
      }

      checkbox.addEventListener("change", (e) => {
        // 종별 체크박스 하나라도 checked인 경우
        seriesCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });
        seriesBtn.value = "true";
        seriesBtn.textContent = "전체 선택";

        if (e.target.checked) {
          //will add the clicked checkbox id to the selectedIds array
          checkedIds.push(e.target.id);
        } else {
          //will remove the clicked checbkox id from the selectedIds array
          checkedIds = checkedIds.filter((id) => id !== e.target.id);
        }
        refreshCards();
      });
    });

    // series 필터링 기능

    seriesCheck.forEach((checkbox) => {
      checkedIds = [];
      // 체크박스 하나라도 checked가 아닌 경우
      if (!checkbox.checked) {
        seriesBtn.value = "true";
        seriesBtn.textContent = "전체 선택";
      } else {
        seriesBtn.value = "false";
        seriesBtn.textContent = "전체 해제";
      }

      checkbox.addEventListener("change", (e) => {
        // 타입체크박스 checked 해제
        typeCheck.forEach((checkbox) => {
          checkbox.checked = false;
        });

        // 타입버튼 초기화
        typeBtn.value = "false";
        typeBtn.textContent = "전체 선택";

        if (e.target.checked) {
          //will add the clicked checkbox id to the selectedIds array
          checkedIds.push(e.target.id);
        } else {
          //will remove the clicked checbkox id from the selectedIds array
          checkedIds = checkedIds.filter((id) => id !== e.target.id);
        }
        refreshCards();
      });
    });

    typeCheck.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
          seriesCheck.forEach((checkbox) => {
            if (checkedIds.includes(checkbox.id)) {
              checkedIds = checkedIds.filter((id) => id !== checkbox.id);
            }
          });
        }
      });
    });
    seriesCheck.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
          typeCheck.forEach((checkbox) => {
            if (checkedIds.includes(checkbox.id)) {
              checkedIds = checkedIds.filter((id) => id !== checkbox.id);
            }
          });
        }
      });
    });
  }
});

//! 문제점1: 시리즈 누르고 다시 종별 checkbox누르면 시리즈필터링한  카드가 그대로 있음

//! 문제점2: 시리즈 전체 선택한 뒤 시리즈 체크박스 하나만 눌러도 카드가 전부다 사라짐
