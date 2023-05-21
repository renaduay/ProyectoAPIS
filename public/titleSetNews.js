class titleSetNews {
    constructor(resultsContainer) {
      this.setTitleInput = resultsContainer.querySelector('#set-title-input');
      this.setNewsInput = resultsContainer.querySelector('#set-news-input');      
    }

    show(titleNews) {
      this.setTitleInput.value = titleNews.title;
      this.setNewsInput.value = titleNews.news;
    }

    read() {
      const result = {
        title: this.setTitleInput.value,
        news: this.setNewsInput.value
      };
      return result;
    }
}

export default titleSetNews;
