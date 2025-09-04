import { displayBackgroundImage } from "../utils/displayBackground.js";
import { fetchApiData } from "../api.js";
import { IMAGE_BASE_URL } from "../config.js";

export async function displayMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    console.error("No movie ID found in URL");
    return;
  }

  const results = await fetchApiData(`movie/${movieId}`);
  displayBackgroundImage("movie", results.backdrop_path);
  const mainDiv = document.querySelector("#movie-details");
  const div = document.createElement("div");
  div.classList.add("details-top");
  div.innerHTML = `
          <div>
            <img
               src="${results.poster_path ? IMAGE_BASE_URL + results.poster_path : "images/no-image.jpg"}"
              class="card-img-top"
              alt="${results.original_title}"
            />
          </div>
          <div>
            <h2>${results.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average}
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${results.genres.map((genre) => `<li>${genre.name}</li>`).join("")}

            </ul>
            <a href="/index.html" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Popularity:</span> ${results.popularity}</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
              ${results.production_companies.map((company) => `<li>${company.name}</li>`).join("")}
            </div>
`;
  mainDiv.appendChild(div);
}
