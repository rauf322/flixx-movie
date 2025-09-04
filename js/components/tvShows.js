import { fetchApiData } from "../api.js";
import { IMAGE_BASE_URL } from "../config.js";

export async function displayPopularShows() {
  const { results } = await fetchApiData("tv/popular");
  const mainDiv = document.querySelector("#popular-shows");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
<a href="tv-details.html?id=${show.id}">
  <img
     src="${show.poster_path ? IMAGE_BASE_URL + show.poster_path : "images/no-image.jpg"}"
    class="card-img-top"
    alt="${show.name}"
  />
</a>
<div class="card-body">
  <h5 class="card-title">${show.name}</h5>
  <p class="card-text">
    <small class="text-muted">Release: ${show.first_air_date}</small>
  </p>
</div>
`;
    mainDiv.appendChild(div);
  });
}
