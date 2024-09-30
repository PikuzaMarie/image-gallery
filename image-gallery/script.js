const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const imagesContainer = document.getElementById('imagesContainer');

searchBtn.addEventListener('click', function() {
    const query = searchInput.value;
    searchImages(imagesContainer, query);
});

function searchImages(container, query) {
    const url = `/.netlify/functions/unsplash-search`;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        container.innerHTML = '';

        if (data.results && Array.isArray(data.results)) {
            data.results.forEach(image => {
                const img = document.createElement('img');
                img.src = image.urls.regular;
                container.appendChild(img);
            });
        } else {
            console.error('No results found');
        }
    })
    .catch(error => {
        console.error('Error fetching photos:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    searchInput.focus();
    searchImages(imagesContainer, 'autemn');
})

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value;
    searchImages(imagesContainer, query);
});
