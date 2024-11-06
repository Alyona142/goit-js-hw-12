import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import { showLoader, hideLoader } from './js/loader.js'; // Переконайтеся, що цей файл існує
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[name="search"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let queryString = '';

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  queryString = searchInput.value.trim();
  if (queryString) {
    resetGallery();
    loadImages(queryString, currentPage);
  }
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadImages(queryString, currentPage, true);
});

async function loadImages(query, page, append = false) {
  try {
    showLoader();
    const data = await fetchImages(query, page);
    const images = data.hits;
    if (images.length) {
      renderGallery(images, gallery, append);
      showHideLoadMoreBtn(data.totalHits);
    } else {
      iziToast.info({ title: 'Info', message: 'No images found.' });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
}

function showHideLoadMoreBtn(totalHits) {
  if (totalHits <= currentPage * 15) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function resetGallery() {
  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';
}

// import axios from 'axios';
// import { renderGallery } from './js/render-functions.js';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import 'izitoast/dist/css/iziToast.css';

// const API_KEY = '46806668-35f52dba5a140225900df36e0';
// const API_URL = 'https://pixabay.com/api/';

// const searchForm = document.querySelector('.search-form');
// const searchInput = searchForm.querySelector('input[name="search"]');
// const gallery = document.querySelector('.gallery');
// const loaderContainer = document.querySelector('.loader-container');
// const loadMoreBtn = document.querySelector('.load-more-btn');
// const lightbox = new SimpleLightbox('.gallery a');

// let currentPage = 1;
// let queryString = '';
// let totalHits = 0;


// function showLoader() {
//   const loaderContainer = document.querySelector('.loader-container');
//   if (loaderContainer) {
//     loaderContainer.style.display = 'flex';
//   } else {
//     console.error("Element '.loader-container' not found.");
//   }
// }

// function resetGallery() {
//   gallery.innerHTML = '';
//   currentPage = 1; 
//   loadMoreBtn.style.display = 'none'; 
// }

// async function loadImages(query, page) {
//   try {
//     showLoader();
//     const response = await axios.get(API_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         page: page,
//         per_page: 15, 
//       },
//     });

//     const images = response.data.hits; 
//     totalHits = response.data.totalHits; 

//     if (Array.isArray(images) && images.length > 0) {
//       renderGallery(images, gallery);
//       showHideBtn(totalHits);
//     } else {
//       iziToast.info({ title: 'Info', message: 'No images found for your search query.' });
//       resetGallery();
//     }
//   } catch (error) {
//     console.error('Error loading images:', error);
//     iziToast.error({ title: 'Error', message: 'Failed to load images.' });
//     resetGallery();
//   } finally {
//     showLoader();
//   }
// }

// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const query = searchInput.value.trim();
//   if (query.length === 0) {
//     return;
//   }

//   queryString = query;
//   resetGallery();
//   loadImages(queryString, currentPage);
// });

// loadMoreBtn.addEventListener('click', () => {
//   currentPage += 1;
//   loadImages(queryString, currentPage);
// });

// function showHideBtn(totalImages) {
//   if (totalImages <= currentPage * 15) { 
//     loadMoreBtn.style.display = 'none';
//     iziToast.info({ title: 'Info', message: 'No more images to load.' });
//   } else {
//     loadMoreBtn.style.display = 'block';
//   }
// }

