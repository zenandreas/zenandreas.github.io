const auth = "563492ad6f917000010000013a573dd3e55242b6acabf4ed6fb43bb0";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fethLink = "";
let currentSearch;

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(event) {
  searchValue = event.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <img src=${photo.src.large}></img>
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a> 
        </div>
        `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fethLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fethLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  if (query) {
    fethLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fethLink);
    generatePictures(data);
  } else {
    curatedPhotos();
  }
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
  page = 1;
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fethLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fethLink);
  generatePictures(data);
}

curatedPhotos();
