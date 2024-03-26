const dataList = fetch("./index.json")
  .then((response) => response.json())
  .then((data) => {
    const bigMonData = data[0].bigMonster;
    const typeListData = data[1].typeList;
    const workListData = data[2].workList;
    console.log(bigMonData)
    return { bigMonData, typeListData, workListData };
  })
  .catch((error) => console.log(error));

  dataList.then(({bigMonData}) => {
    const monList = document.querySelector(".monster-list");
  
    bigMonData.forEach(item => {
      console.log(item)
      const monLi = document.createElement("li")
      const monCard = document.createElement("div")
      const monImg = document.createElement("img")
      monImg.src = item.imgurl
      const monName = document.createElement("strong")
      monName.textContent = item.name
      monCard.classList.add("monster-card");

      monList.appendChild(monLi);
      monLi.appendChild(monCard);
      monCard.appendChild(monImg);
      monCard.appendChild(monName);
    });
  });

dataList.then(({typeListData}) => {
  const typeList = document.querySelector(".type-list");

  typeListData.forEach(item => {
    const typeLi = document.createElement("li");
    const typeBtn = document.createElement("button");
    typeBtn.textContent = item.type;
    typeList.appendChild(typeLi);
    typeLi.appendChild(typeBtn);
  });
});

dataList.then(({workListData}) => {
  const workList = document.querySelector(".work-list");

  workListData.forEach(item => {
    const workLi = document.createElement("li");
    const workBtn = document.createElement("button");
    workBtn.textContent = item.work;
    workList.appendChild(workLi);
    workLi.appendChild(workBtn);
  });
});