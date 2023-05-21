class titleNews {
    constructor(resultsContainer, titleNews) {
        const titleDisplay = resultsContainer.querySelector('#title');
        const newsDisplay = resultsContainer.querySelector('#news');
        titleDisplay.textContent = titleNews.title;
        newsDisplay.textContent = titleNews.news;
    }
}

export default titleNews;