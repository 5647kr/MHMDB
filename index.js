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
  const typeBtn = document.querySelector(".btn-list .typeBtn");
  const seriesBtn = document.querySelector(".btn-list .seriesBtn")

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

  // all btn 생성
  const typeAllBtnItem = createLi();
  const typeResetBtnItem = createLi();
  const typeAllBtn = document.createElement("button");
  const typeResetBtn = document.createElement("button");

  typeAllBtnItem.appendChild(typeAllBtn);
  typeResetBtnItem.appendChild(typeResetBtn);
  typeBtn.appendChild(typeAllBtnItem);
  typeBtn.appendChild(typeResetBtnItem);

  typeAllBtn.textContent = "전체선택";
  typeResetBtn.textContent = "전체해제";

  const seriesAllBtnItem = createLi();
  const seriesResetBtnItem = createLi();
  const seriesAllBtn = document.createElement("button");
  const seriesResetBtn = document.createElement("button");

  seriesBtn.appendChild(seriesAllBtnItem);
  seriesBtn.appendChild(seriesResetBtnItem);
  seriesAllBtnItem.appendChild(seriesAllBtn);
  seriesResetBtnItem.appendChild(seriesResetBtn);

  seriesAllBtn.textContent = "전체선택";
  seriesResetBtn.textContent = "전체해제";
  
  //! seriesAllBtn disabled 나중에 풀것!
  seriesAllBtn.disabled = true;

  seriesResetBtn.disabled = true;

  // card 초기설정
  const cards = document.querySelectorAll(".monster-list li");
  
  // type 필터링 기능
  const typeCheck = document.querySelectorAll(".type-list input");

  typeCheck.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.addEventListener("click", (e) => {
      const seriesCardsReset = () => {
        cards.forEach((card) => {
          card.style.display = "none"
        })
      }

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
      checkbox.removeEventListener("click", seriesCardsReset)
    });

    typeResetBtn.addEventListener("click", () => {
      checkbox.checked = false;
      const cards = document.querySelectorAll(".monster-list li");
      cards.forEach((card) => {
        card.style.display = "none";
      })
    })

    typeAllBtn.addEventListener("click", () => {
      checkbox.checked = true;
      const cards = document.querySelectorAll(".monster-list li");
      cards.forEach((card) => {
        card.style.display = "block";
      })
    })
  });

  // series 필터링 기능
  const seriesCheck = document.querySelectorAll(".work-list input");
  const cardSeries = document.querySelectorAll(
    ".monster-list li .monster-card #series"
  );


  seriesCheck.forEach((checkbox) => {
    //! checkbox 비활성화 풀것!
    checkbox.disabled = true;
    checkbox.addEventListener("click", (e) => {
      const typeCardsReset = () => {
        cards.forEach((card) => {
          card.style.display = "none"
        })
      }

      cardSeries.forEach((card) => {
        const seriesCheckList = card.closest("li");

        if (e.target.checked && card.textContent.includes(e.target.id)) {
          seriesCheckList.style.display = "block"
        } else if(!e.target.checked && card.textContent.includes(e.target.id)) {
          seriesCheckList.style.display = "none"
        }
      });
      checkbox.removeEventListener("click", typeCardsReset)
    });


    seriesResetBtn.addEventListener("click", () => {
      checkbox.checked = false;
      const cards = document.querySelectorAll(".monster-list li");
      cards.forEach((card) => {
        card.style.display = "none";
      })
    })

    seriesAllBtn.addEventListener("click", () => {
      checkbox.checked = true;
      const cards = document.querySelectorAll(".monster-list li");
      cards.forEach((card) => {
        card.style.display = "block";
      })
    })
  })


  // 체크박스 리셋하기
  typeCheck.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      seriesCheck.forEach((uncheckedbox) => {
        uncheckedbox.checked = false;
      })
      typeResetBtn.disabled = false;
    })

    typeAllBtn.addEventListener("click", () => {
      seriesCheck.forEach((uncheckedbox) => {
        uncheckedbox.checked = false;
      })
      typeResetBtn.disabled = false;
    })

    typeResetBtn.addEventListener("click", () => {
      typeResetBtn.disabled = true;
    })
  })

  seriesCheck.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      typeCheck.forEach((uncheckedbox) => {
        uncheckedbox.checked = false;
      })
      seriesResetBtn.disabled = false;
    })
    seriesAllBtn.addEventListener("click", () => {
      typeCheck.forEach((uncheckedbox) => {
        uncheckedbox.checked = false;
      })
      seriesResetBtn.disabled = false;
    })
    seriesResetBtn.addEventListener("click", () => {
      seriesResetBtn.disabled = true;
    })
  })

  seriesAllBtn.addEventListener("click", () => {
    typeResetBtn.disabled = true;
  })
  typeAllBtn.addEventListener("click", () => {
    seriesResetBtn.disabled = true;
  })
}
