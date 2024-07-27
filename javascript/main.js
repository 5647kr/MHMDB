class MainPageEvent {
  constructor() {
    const controlList = document.querySelector(".control-list");
    this.typeList = controlList.querySelector(".type-list");
    this.seriesList = controlList.querySelector(".series-list");
  }
  
  eventHandle() {
    // url 설정 
    this.monsterList = document.querySelectorAll('.card-list li a');
    this.monsterList.forEach((item) => {
      item.addEventListener("click", (event) => {
        const targetCard = event.currentTarget.dataset.name;
        window.location.href = `detail.html?monster=${targetCard}`
      })
    })
    // /url 설정
    
    // 검색 기능
    // /검색 기능
    
    // 이미지 슬라이드 기능
    // /이미지 슬라이드 기능
    
    // 필터링 기능
    // /필터링 기능
  }
}

export default MainPageEvent;
