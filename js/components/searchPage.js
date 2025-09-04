import { showAlert } from '../utils/showAlert.js';
import { searchApiData } from '../api.js';
import { IMAGE_BASE_URL } from '../config.js';

const search = {
  term: '',
  type: '',
  page: 1,
  totalPages: 1,
  totalResults: 0,
};
export async function searchMovie() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  search.type = params.get('type');
  search.term = params.get('search-term');
  if (search.term == '' || search.term == null) {
    showAlert('Please enter the serch content!');
    return;
  }
  const { results, total_pages, page, total_results } =
    await searchApiData(search);
  search.page = page;
  search.totalPages = total_pages;
  search.totalResults = total_results;
  displaySearchResult(results);
}
function displaySearchResult(results) {
  console.log(search.totalPages);
  let mainDiv = document.querySelector('#search-results');
  mainDiv.innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = `
<h2>${results.length} of ${search.totalResults}</h2>
`;
  results.map((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
<div class="card">
  <a href="${search.type}-details.html?id=${movie.id}">
    <img     
      src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'images/no-image.jpg'}"
      class="card-img-top" alt="" />
  </a>
  <div class="card-body">
     <h5 class="card-title">${movie.title || movie.name}</h5>
     <p class="card-text">
       <small class="text-muted">Release: ${movie.release_date || movie.first_air_date}</small>
     </p>
  </div>
</div>

`;
    mainDiv.appendChild(div);
  });
  mainDiv = document.querySelector('#pagination');
  mainDiv.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
<button class="btn btn-primary" id="prev">Prev</button>
<button class="btn btn-primary" id="next">Next</button>
<div class="page-counter">${search.page} of ${search.totalPages}</div>
`;
  mainDiv.appendChild(div);

  nextPage();
}
export function nextPage() {
  const btnNext = document.querySelector('#next');
  const btnPrev = document.querySelector('#prev');
  if (search.page < search.totalPages) {
    btnPrev.disabled = false;
    btnNext.disabled = false;
  }
  if (search.page == 1) {
    btnPrev.disabled = true;
  }
  if (search.page == search.totalPages) {
    btnNext.disabled = true;
  }
  btnNext.addEventListener('click', async () => {
    search.page++;
    const { results, total_pages } = await searchApiData(search);
    displaySearchResult(results);
  });
  btnPrev.addEventListener('click', async () => {
    search.page--;
    const { results, total_pages } = await searchApiData(search);
    displaySearchResult(results);
  });
}
