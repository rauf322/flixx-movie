import { API_KEY, TMDB_BASE_URL } from './config.js';

export async function fetchApiData(endpoint) {
  const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchApiData({ type, term, page }) {
  const url = `${TMDB_BASE_URL}/search/${type}?api_key=${API_KEY}&query=${term}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
