
    const JSON_PATH = 'https://yayinternet.github.io/lecture17/oo-albums/albums.json';

class App {
  constructor() {
     this._onJsonReady = this._onJsonReady.bind(this);
     this._onTecClick = this._onTecClick.bind(this);
    
     const tecButton = document.querySelector("#tec");
     tecButton.addEventListener('click', this._onTecClick);
  }
  
  _onTecClick() {
    this.newsList.sort( function (a1, a2) {
      return a1.year - a2.year;
    });
    this._renderNewsImages();
     
  }
  
  _renderNewsImages() {
    const imagesContainer = document.querySelector("#news-container");
    imagesContainer.innerHTML = "";
    for (const news of this.newsList) {      
      const a = new Images(imagesContainer, news.url);        
    }  
  }
  
  loadNews() {
    fetch(JSON_PATH)
      .then(this._onResponse)
      .then(this._onJsonReady);
  }
  
  _onJsonReady(json) {
    this.newsList = json.news;
    this._renderNewsImages()
  }

  _onResponse(response) {
    return response.json();
  }
}

class News {
  constructor(newsContainer, imageUrl) {
    // Same as document.createElement('img');
    const image = new Image();
    image.src = imageUrl;
    newsContainer.append(image);
  }
}

// script.js
const app = new App();
app.loadNews();

