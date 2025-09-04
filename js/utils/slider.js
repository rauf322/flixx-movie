import { fetchApiData } from "../api.js";
import { IMAGE_BASE_URL } from "../config.js";

// Universal slider function that works for both movies and TV shows
export async function displaySlider(options = {}) {
  const {
    endpoint = "movie/now_playing",
    containerSelector = ".swiper-wrapper",
    linkPrefix = "movie-details.html",
    titleProperty = "title",
    swiperSelector = ".swiper",
  } = options;

  const { results } = await fetchApiData(endpoint);
  const mainDiv = document.querySelector(containerSelector);

  if (!mainDiv) {
    console.error(`Container ${containerSelector} not found`);
    return;
  }

  // Clear existing slides
  mainDiv.innerHTML = "";

  results.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="${linkPrefix}?id=${item.id}">
              <img src="${item.poster_path ? IMAGE_BASE_URL + item.poster_path : "images/no-image.jpg"}" alt="${item[titleProperty]}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${item.vote_average.toFixed(1)} / 10
            </h4>
        `;
    mainDiv.appendChild(div);
  });

  initializeSwiper(swiperSelector);
}

// Specific function for movie slider (for backward compatibility)
export async function displayMovieSlider() {
  return displaySlider({
    endpoint: "movie/now_playing",
    containerSelector: ".swiper-wrapper",
    linkPrefix: "movie-details.html",
    titleProperty: "title",
    swiperSelector: ".swiper",
  });
}

// New function for TV shows slider
export async function displayTVSlider() {
  return displaySlider({
    endpoint: "tv/on_the_air",
    containerSelector: ".swiper-wrapper",
    linkPrefix: "tv-details.html",
    titleProperty: "name",
    swiperSelector: ".swiper",
  });
}

function initializeSwiper(swiperSelector = ".swiper") {
  const swiper = new Swiper(swiperSelector, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    // Navigation arrows (dynamic based on swiper selector)
    navigation: {
      nextEl: `${swiperSelector}-button-next`,
      prevEl: `${swiperSelector}-button-prev`,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
