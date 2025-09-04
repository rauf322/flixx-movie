import { fetchApiData } from '../api.js';
import { displayBackgroundImage } from '../utils/displayBackground.js';
import { IMAGE_BASE_URL } from '../config.js';

export async function displayTvDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const tvId = urlParams.get('id');

  if (!tvId) {
    console.error('No TV show ID found in URL');
    return;
  }

  const results = await fetchApiData(`tv/${tvId}`);
  displayBackgroundImage('tv', results.backdrop_path);
  const mainDiv = document.querySelector('#show-details');
  const div = document.createElement('div');
  div.classList.add('details-top');
  div.innerHTML = `
          <div>
            <img
               src="${results.poster_path ? IMAGE_BASE_URL + results.poster_path : 'images/no-image.jpg'}"
              class="card-img-top"
              alt="${results.original_name}"
            />
          </div>
          <div>
            <h2>${results.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average}
            </p>
            <p class="text-muted">Release Date: ${results.first_air_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${results.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="/shows.html"  class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${results.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> 
                ${results.last_episode_to_air.episode_number}
            </li>
            <li><span class="text-secondary">Status:</span> ${results.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies
            .map((company) => `<li>${company.name}</li>`)
            .join('')}</div>
`;
  mainDiv.appendChild(div);
}
