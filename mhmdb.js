let checkList = [];

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
    speciesBtn.id = species.type

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

  // 모든 btn 기본값 설정
  const allBtn = btnSection.querySelectorAll("button");
  const allBtnArr = Array.from(allBtn);

  allBtnArr.map(btn => {
    btn.state = "false";
    btn.addEventListener("click", () => {
      (btn.state = btn.state === "false" ? "true" : "false") && btn.classList.toggle("active", btn.state === "true");
    })
  })


  // 종별, 시리즈 버튼 중복선택 예외처리
  const speciesBtn = btnSection.querySelectorAll(".species li button");
  const seriesBtn = btnSection.querySelectorAll(".series li button")
  const totalBtn = btnSection.querySelector(".totalBtn");
  
  // 종별 예외처리
  speciesBtn.forEach((species) => {
    species.addEventListener("click", () => {
      seriesBtn.forEach((series) => {
        // 모든 시리즈 버튼 초기화
        series.state = "false"
        series.classList.remove("active")
        // checkList에 시리즈id 포함시 삭제
        if(checkList.includes(series.id)) {
          checkList = checkList.filter((id) => id !== series.id)
        }
      })
      // 해당버튼이 true시 checkList에 추가
      if(species.state === "true") {
        checkList.push(species.id)
        console.log(checkList)
      } else {
        // 해당버튼이 false시 checkList에 삭제
        checkList = checkList.filter((id) => id !== species.id)
        console.log(checkList)
      }
      cardFilter();
    })
  })

  // 시리즈 예외처리
  seriesBtn.forEach((series) => {
    series.addEventListener("click", () => {
      speciesBtn.forEach((species) => {
        // 모든 종별 버튼 초기화
        species.state = "false"
        species.classList.remove("active")
        // checkList에 종별id 포함시 삭제
        if(checkList.includes(species.id)) {
          checkList = checkList.filter((id) => id !== species.id)
        }
      })
      // 전체선택버튼이 true인 경우 초기화
      if(totalBtn.state === "true") {
        totalBtn.state = "false";
        totalBtn.classList.remove("active");
        totalBtn.textContent = "전체선택"
      }
      // 해당버튼이 true시 checkList에 추가
      if(series.state === "true") {
        checkList.push(series.id)
        console.log(checkList)
      } else {
        //해당버튼이 false시 checkList에 삭제
        checkList = checkList.filter((id) => id !== series.id)
        console.log(checkList)
      }
      cardFilter();
    })
  })

  // 전체선택 btn 설정
  totalBtn.addEventListener("click", () => {
    totalBtn.textContent = totalBtn.state === "true" ? "전체해제" : "전체선택"
    console.log(totalBtn.state)
    
    if(totalBtn.state === "true") {
      // 전체선택버튼 true시 종별 버튼 전체 활성화
      speciesBtn.forEach((species) => {
        checkList.push(species.id)
        species.state = "true";
        species.classList.add("active");
      })

      // 전체선택버튼 true시 시리즈 버튼 전체 초기화
      seriesBtn.forEach((series) => {
        series.state = "false";
        series.classList.remove("active")
        checkList = checkList.filter((id) => id !== series.id)
      })
      // 필터링 함수 작동
      cardFilter();
      console.log(checkList)
    } else {
      // 전체선택버튼 false시 checkList 초기화
      checkList = []

      // 전체선택버튼 false시 종별 버튼 전체 초기화
      speciesBtn.forEach((species) => {
        species.state = "false";
        species.classList.remove("active");
      })
      cardFilter();
      console.log(checkList)
    }
  })

  // monster card 생성
  monsterData.map((monster) => {
    const cardList = cardSection.querySelector(".cardList");
    const cardItem = document.createElement("li");
    const card = document.createElement("div");

    const monsterNickname = monster.nickname.substring(0, monster.nickname.indexOf("["));

    const cardContent = `
    <h4>${monster.name}</h4>
    <img src="${monster.icon}" alt="${monster.name}">
    <div class="cardContent">
    <p>${monsterNickname}</p>
    <p>${monster.type}</p>
    <p>${monster.small} - ${monster.large}</p>
    <p class="a11y-hidden">${monster.seriesId}</p>
    <div></div>
    <div></div>
    </div>
    `

    card.classList.add("card");
    card.classList.add("monster");

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
      const signImg = document.createElement("img");
      
      signImg.classList.add("signImg");

      signImg.src = `./간판/${monster.sign}.webp`;
      signImg.alt = "간판 몬스터";

      card.appendChild(signImg);
    }
  })

  // 필터링 함수
  function cardFilter() {
    const cardList = cardSection.querySelector(".cardList")
    for(let card of cardList.querySelectorAll("li")) {
      card.style.display = "none";
      for (let id of checkList) {
        if (card.textContent.includes(id)) {
          card.style.display = "block";
          break;
        }
      }
    }
  }

  // 검색 기능
  const searchIpt = btnSection.querySelector("input");
  const searchBtn = btnSection.querySelector(".searchBtn");
  let isSearched = false;
  const searchItem = cardSection.querySelectorAll(".cardList li")
  const searchName = cardSection.querySelectorAll(".cardList li .monster h4")
  
  function searchCard() {
    isSearched = false;

    // 안보이는 항목을 모두 보이게
    searchItem.forEach(item => item.style.display = 'block');

    // 이름 검색 기능
    searchName.forEach((search, index) => {
      const name = search.textContent;

      if (name.includes(searchIpt.value)) {
        if (!isSearched) {
          // 해당하는 카드로 화면 이동
          searchItem[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
          isSearched = true;
        }
      }
    });
    
    if (!isSearched) {
      alert('검색 결과가 없습니다.');
    }
  }
  
  searchBtn.addEventListener("click", () => {
    searchCard();
    // 검색 후 ipt 초기화
    searchIpt.value = "";
  });
  
  searchIpt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchCard();
      // 검색 후 ipt 초기화
      searchIpt.value = ""
    }
  });

}


