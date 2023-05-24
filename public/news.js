document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Función para obtener las noticias de la API
  const getNews = async () => {
    try {
      const response = await fetch("/lookup/Tecnología"); // Cambia el parámetro de búsqueda según tus necesidades
      const data = await response.json();

      if (data.news.length > 0) {
        // Generar las cards de noticias
        const newsCards = data.news.map((article) => `
          <div class="news-card">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.publishedAt}</p>
            <p>${article.source.name}</p>
            <a href="${article.url}" target="_blank">Leer más</a>
          </div>
        `).join("");

        // Insertar las cards de noticias en el contenedor
        newsContainer.innerHTML = newsCards;
      } else {
        newsContainer.innerHTML = "No se encontraron noticias";
      }
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
      newsContainer.innerHTML = "Error al obtener las noticias";
    }
  };


  // Llamar a la función para obtener las noticias al cargar la página
  getNews();
});

// 1. new de la clase que definimos
// 2. función de la linea 6 a la 31 (la llamamos desde el constructor)
// 3. otra funcion para obtener detalles cuando se haga click en los titulos
// traer titulos y id
// usuar mockachino 
