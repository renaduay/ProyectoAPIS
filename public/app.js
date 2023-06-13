import Newspaper from "./newspaper.js";
import TitleNews from "./titleNews.js";
import TitleSetNews from "./titleSetNews.js";


class App {
  constructor() {
    this.newspaper = new Newspaper();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const setForm = document.querySelector('#set');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);

    const logoutButton = document.querySelector("#cerrarsesion");
    logoutButton.addEventListener('click', this.newspaper.logout);
  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const titleSetNews = new TitleSetNews(resultsContainer);
    const postBody = titleSetNews.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.newspaper.save(postBody)
      .then(result => {
        // Update news
        new TitleNews(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const input = document.querySelector('#title-input');
    const title = input.value.trim();
    this.newspaper.doLookup(title)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show title news.
    new TitleNews(resultsContainer, result);

    // Prep set news form.
    const titleSetNews = new TitleSetNews(resultsContainer);
    titleSetNews.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();
