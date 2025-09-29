import { API_BASE_URL } from './config.js';

export async function fetchApiData(endpoint) {
  const url = `${API_BASE_URL}?endpoint=${encodeURIComponent(endpoint)}`;

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
  const url = `${API_BASE_URL}?type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}&page=${page || 1}`;
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
