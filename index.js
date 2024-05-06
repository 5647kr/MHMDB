document.addEventListener("DOMContentLoaded", () => {
  // checkedIds 배열을 초기화합니다.
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
    "고룡종"];

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
    const main = document.querySelector("main");
    const html = document.querySelector("html");
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
      const monNickName = monster.nickname.substring(0, monster.nickname.indexOf("["));
      cardWrap.classList.add("monster-card");

      const cardContent = `
      <div class="fontStyle">
        <h2>${monster.name}</h2>
      </div>
      <img src="${monster.icon}" alt="몬스터 아이콘">
      <div class="elementList"></div>
      <div class="stateList"></div>
      <p id="sign">${monster.sign}</p>
      <div class="fontStyle">
        <p id="nickname">${monNickName}</p>
        <p id="type">${monster.type}</p>
        <p id="size"><span>${monster.small}</span> - <span>${monster.large}</span></p>
      </div>
        <p class="a11y-hidden" id="series">${monster.seriesId}</p>
      `;

    


      cardWrap.innerHTML = cardContent;
      cardItem.appendChild(cardWrap);
      monsterList.appendChild(cardItem);

      // 몬스터별 속성아이콘 추가
      const elementImgWrap = cardWrap.querySelector('.elementList');

      if(monster.element !== "") {
        monster.element.split(",").forEach((el) => {
          const elementImg = document.createElement("img");
          elementImg.classList.add("elements")
          elementImg.src = `./icon/속성/${el.trim()}.webp`;
          elementImg.alt = el.trim();
          elementImgWrap.appendChild(elementImg); 
        });
      }

      // 몬스터별 상태아이콘 추가
      const stateImgWrap = cardWrap.querySelector(".stateList")

      if(monster.ailments !== "") {
        monster.ailments.split(",").forEach((ail) => {
          const ailmentsImg = document.createElement("img");
          ailmentsImg.classList.add("elements")
          ailmentsImg.src = `./icon/상태/${ail.trim()}.webp`;
          ailmentsImg.alt = ail.trim();
          stateImgWrap.appendChild(ailmentsImg); 
        });
      }

      // 간판몬스터 설정
      const seriesSign = cardWrap.querySelectorAll("#sign")
      seriesSign.forEach((sign) => {
        if(sign.textContent === "") {
          sign.classList.add("a11y-hidden")
        } else {
          sign.classList.add("title-series")
        }
      })

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
      seriesCheckBox.textContent = series.work;

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
        card.style.display = "none";
        for (let id of checkedIds) {
          if (card.textContent.includes(id)) {
            card.style.display = "block";
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
          checkedIds.push(e.target.id);
        } else {
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

        const seriesSign = document.querySelectorAll("#sign")
        seriesSign.forEach((sign) => {
        })

        if (e.target.checked) {
          checkedIds.push(e.target.id);
        } else {
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
