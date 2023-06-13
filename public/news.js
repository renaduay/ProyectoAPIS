const JSON_PATH = "https://www.mockachino.com/220cebc5-2bc2-49/news"
class AllNews {
  constructor() {
    this.newsList = []; // Lista de noticias

    this._onJsonReady = this._onJsonReady.bind(this);
    this._onTecClick = this._onTecClick.bind(this);
    this._onDepClick = this._onDepClick.bind(this);
    this._onProgClick = this._onProgClick.bind(this);
    this._onEcoClick = this._onEcoClick.bind(this);
    this._onEduClick = this._onEduClick.bind(this);


    const tecButton = document.querySelector("#tec");
    tecButton.addEventListener('click', this._onTecClick);

    const depButton = document.querySelector("#dep");
    depButton.addEventListener('click', this._onDepClick);
    
    const progButton = document.querySelector("#prog");
    progButton.addEventListener('click', this._onProgClick);

    const ecoButton = document.querySelector("#eco");
    ecoButton.addEventListener('click', this._onEcoClick);

    const eduButton = document.querySelector("#edu");
    eduButton.addEventListener('click', this._onEduClick);

  }
  
//filtrar categoria Tecnologia
  _onTecClick() {
    const tecNewsList = this.newsList.filter(news => news.category === 'Tecnología');
    this._renderNewsImages(tecNewsList);
  }
  //filtar categoria Economia
  _onEcoClick() {
    const ecoNewsList = this.newsList.filter(news => news.category === 'Economía');
    this._renderNewsImages(ecoNewsList);
  }
//filtrar categoria Deportes
  _onDepClick() {
    const depNewsList = this.newsList.filter(news => news.category === 'Deportes');
    this._renderNewsImages(depNewsList);
  }
  //filtrar categoria Programacion
  _onProgClick() {
    const progNewsList = this.newsList.filter(news => news.category === 'Programación');
    this._renderNewsImages(progNewsList);
  } 
  //filtrar categoria Educacion
   _onEduClick() {
    const eduNewsList = this.newsList.filter(news => news.category === 'Educación');
    this._renderNewsImages(eduNewsList);
  }

  _renderNewsImages(newsList) {
    const imagesContainer = document.querySelector("#news-container");
    imagesContainer.innerHTML = "";

    for (const news of newsList) {
      const image = new Images(imagesContainer, news.img);
    }
  }

  loadNews() {
    fetch(JSON_PATH)
      .then(this._onResponse)
      .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.newsList = json.news;
    this._renderNewsImages(this.newsList);

  }

  _onResponse(response) {
    return response.json();
  }
}


class Images {
  constructor(newsContainer, imageUrl) {
    // Same as document.createElement('img');
    const image = new Image();
    image.src = imageUrl;
    image.height = 100;
    newsContainer.append(image);
  }
} 



// script.js
const app = new AllNews();
app.loadNews();

//export default AllNews;
//export default Images; 