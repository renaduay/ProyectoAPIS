const JSON_PATH = "https://www.mockachino.com/220cebc5-2bc2-49/news"
class AllNews {
  constructor() {
     this._onJsonReady = this._onJsonReady.bind(this);
     this._onTecClick = this._onTecClick.bind(this);
     this._onDepClick = this._onDepClick.bind(this);
    
     const tecButton = document.querySelector("#tec");
     tecButton.addEventListener('click', this._onTecClick);
    
     const depButton = document.querySelector("#dep");
     depButton.addEventListener('click', this._onDepClick);
  }
  
  _onTecClick() {
    const tecNewsList = this.newsList.filter(news => news.category === 'Tecnología');
    this._renderNewsImages(tecNewsList);
  }

  _onDepClick() {
    const depNewsList = this.newsList.filter(news => news.category === 'Deporte');
    this._renderNewsImages(depNewsList);
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

