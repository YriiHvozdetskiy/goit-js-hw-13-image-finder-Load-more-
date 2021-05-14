import { refs } from './get-refs';
import imagesTpl from '../templetes/card.hbs';
import ApiService from './apiService';
import LoadMoreBtn from './components/load-more-btn';
import { instance } from './components/basicLightbox';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const myError = error;

refs.input.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.markup.addEventListener('click', onMarkup);

const apiServiceImages = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function onMarkup(e) {
  if (e.target.classList.contains('photo-image')) {
    instance.show();
    const largeImage = document.querySelector('.large-image');
    largeImage.src = e.target.dataset.source;
  }
}

function onSearch(e) {
  e.preventDefault();

  apiServiceImages.query = e.currentTarget.elements.query.value;
  searchBtnStatusSwitch('show');
  apiServiceImages.resetPage();

  apiServiceImages.fetchImage().then(images => {
    if (images.length === 0) {
      searchBtnStatusSwitch('hide');
      return myError({
        text: 'Your search did not match any pictures. Please enter a more specific query!',
        delay: 3500,
      });
    }

    clearImagesGallery();
    fetchImages(images);
  });
}
function searchBtnStatusSwitch(status) {
  if (status === 'show') {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    return;
  }

  if (status === 'hide') {
    loadMoreBtn.disable();
    loadMoreBtn.hide();
    return;
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  apiServiceImages.fetchImage().then(images => {
    fetchImages(images);
    refs.loadMoreBtn.scrollIntoView({ behavior: 'smooth' });
  });
}

function fetchImages(images) {
  renderImages(images);
  loadMoreBtn.enable();
}

function clearImagesGallery() {
  refs.markup.innerHTML = '';
}

function renderImages(item) {
  refs.markup.insertAdjacentHTML('beforeend', imagesTpl(item));
}
