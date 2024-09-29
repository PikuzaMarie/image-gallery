const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const imagesContainer = document.getElementById('imagesContainer');

searchBtn.addEventListener('click', function() {
    const query = searchInput.value;
    searchImages(imagesContainer, query);
});

function searchImages(container, query) {
    const url = `/.netlify/functions/unsplash-search?=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = ''; // Очистим контейнер перед новым поиском

            data.results.forEach (image => {
                const img = document.createElement('img');
                img.src = image.urls.small;
                container.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });
}

