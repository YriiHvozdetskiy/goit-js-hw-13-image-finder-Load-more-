const API_KEY = '21492726-451e87d3f3afe144072272f85';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=10&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// ================================

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '21492726-451e87d3f3afe144072272f85';

// function fetchByName(name) {
//   return fetch(
//     `${BASE_URL}?image_type=photo&orientation=horizontal&q=${name}&page=1&per_page=12&key=${API_KEY}`,
//   ).then(response => response.json());
// }

//?  ==== через  асинх-функ

// async function fetchByName(name) {
//   const response = await fetch(
//     `${BASE_URL}?image_type=photo&orientation=horizontal&q=${name}&page=1&per_page=12&key=${API_KEY}`,
//   );
//   const resolt = await response.json();

//   return resolt;
// }

// export default { fetchByName };
