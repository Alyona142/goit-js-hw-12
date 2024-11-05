import axios from 'axios';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.css';

const API_KEY = '46806668-35f52dba5a140225900df36e0';
const API_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[name="search"]');
const gallery = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let queryString = '';
let totalHits = 0;

function showLoader() {
  loaderContainer.style.display = 'flex';
}

function hideLoader() {
  loaderContainer.style.display = 'none';
}

function resetGallery() {
  gallery.innerHTML = '';
  currentPage = 1; 
  loadMoreBtn.style.display = 'none'; 
}

async function loadImages(query, page) {
  try {
    showLoader();
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        per_page: 15, 
      },
    });

    const images = response.data.hits; 
    totalHits = response.data.totalHits; 

    if (Array.isArray(images) && images.length > 0) {
      renderGallery(images, gallery);
      lightbox.refresh(); 
      showHideBtn(totalHits);
    } else {
      iziToast.info({ title: 'Info', message: 'No images found for your search query.' });
      resetGallery();
    }
  } catch (error) {
    console.error('Error loading images:', error);
    iziToast.error({ title: 'Error', message: 'Failed to load images.' });
    resetGallery();
  } finally {
    hideLoader();
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (query.length === 0) {
    return;
  }

  queryString = query;
  resetGallery();
  loadImages(queryString, currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  loadImages(queryString, currentPage);
});

function showHideBtn(totalImages) {
  if (totalImages <= currentPage * 15) { 
    loadMoreBtn.style.display = 'none';
    iziToast.info({ title: 'Info', message: 'No more images to load.' });
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

