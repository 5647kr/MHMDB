// data
class DataGenerator {
  constructor() {
    this.monsterList = document.querySelector(".card-wrap .card-list");
    this.typeList = document.querySelector(".control-list .type-list");
    this.seriesList = document.querySelector(".control-list .series-list");
  }

  async setup() {
    const response = await this.data();
    this.monsterData(response[0].monsterList);
    this.typeData(response[1].typeList);
    this.seriesData(response[2].seriesList);
  }

  async data() {
    try {
      const response = await fetch ("./javascript/index.json")
  
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  monsterData(data) {
    const cardFrag = document.createDocumentFragment();
    data.map((monster) => {
      const cardItem = document.createElement("li");
      const cardItemTemplate = `
        <a href="#" cardData-name = "${monster.name}" cardData-icon = "${monster.icon}" cardData-type = "${monster.type}" cardData-seriesId="${monster.seriesId}">
          <article class="card-item">
            <p class="species">${monster.type}</p>
            <img src="${monster.icon}" alt="더미이미지">
            <strong>${monster.name}</strong>
          </article>
        </a>
      `;

      cardItem.innerHTML = cardItemTemplate;
      cardFrag.append(cardItem);
    })
    this.monsterList.append(cardFrag);
  }

  typeData(data) {
    const typeFrag = document.createDocumentFragment();
    data.map((type) => {
      const typeItem = document.createElement("li");
      const typeItemTemplate = `
        <input type="checkbox" id="${type.type}">
        <label for="${type.type}">${type.type}</label>
      `;
      typeItem.innerHTML = typeItemTemplate;
      typeFrag.append(typeItem);
    })
    this.typeList.append(typeFrag);
  }

  seriesData(data) {
    const seriesFrag = document.createDocumentFragment();
    data.map((series) => {
      const seriesItem = document.createElement("li");
      const seriesItemTemplate = `
        <input type="checkbox" id="${series.series}">
        <label for="${series.series}">${series.series}</label>
      `;
      seriesItem.innerHTML = seriesItemTemplate;
      seriesFrag.append(seriesItem);
    })
    this.seriesList.append(seriesFrag)
  }
}

export default DataGenerator;
// /monster data