import { fetchApiData } from "../api.js";
import { IMAGE_BASE_URL } from "../config.js";

export async function displayPopularMovie() {
  const { results } = await fetchApiData("movie/popular");
  const mainDiv = document.querySelector("#popular-movies");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
<a href="movie-details.html?id=${movie.id}">
  <img
    src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "images/no-image.jpg"}"
    class="card-img-top"
    alt="${movie.title}"
  />
</a>
<div class="card-body">
  <h5 class="card-title">${movie.title}</h5>
  <p class="card-text">
    <small class="text-muted">Release: ${movie.release_date}</small>
  </p>
</div>
`;
    mainDiv.appendChild(div);
  });
}
