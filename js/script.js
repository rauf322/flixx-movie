import { displayMovieSlider, displayTVSlider } from './utils/slider.js';
import { displayPopularMovie } from './components/movies.js';
import { displayPopularShows } from './components/tvShows.js';
import { displayTvDetails } from './components/tvDetailsPage.js';
import { displayMovieDetails } from './components/movieDetailsPage.js';
import { navLinksHighlighter } from './components/navBar.js';
import { searchMovie } from './components/searchPage.js';

function checkPage() {
  const currentPage = window.location.pathname;

  switch (currentPage) {
    case '/':
    case '/index.html':
      displayMovieSlider();
      displayPopularMovie();
      break;
    case '/shows.html':
      displayTVSlider();
      displayPopularShows();
      break;
    case '/tv-details.html':
      displayTvDetails();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/search.html':
      searchMovie();
      break;
    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkPage();
  navLinksHighlighter();
});
