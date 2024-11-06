import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(images, gallery, append = false) {
  const markup = createGalleryMarkup(images);
  
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
  
  lightbox.refresh();
}

function createGalleryMarkup(images) {
  return images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item hvr-grow">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
          <figure class="gallery-figure">
            <ul class="img-content-wrapper">
              <li>Likes<span>${likes}</span></li>
              <li>Views<span>${views}</span></li>
              <li>Comments<span>${comments}</span></li>
              <li>Downloads<span>${downloads}</span></li>
            </ul>
          </figure>
        </a>
      </li>
    `).join('');
}
