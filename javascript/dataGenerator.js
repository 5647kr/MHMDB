// monster data
class DataGenerator {
  constructor() {
    this.cardList = document.querySelector(".card-wrap .card-container");
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
}

export default DataGenerator;
// /monster data