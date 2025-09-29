export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500/';

  if (!API_KEY) {
    return res.status(500).json({ error: 'TMDB API key not configured' });
  }

  const { endpoint, type, term, page } = req.query;

  try {
    let url;

    if (endpoint) {
      url = `${TMDB_BASE_URL}/${endpoint}?api_key=${API_KEY}`;
    } else if (type && term) {
      url = `${TMDB_BASE_URL}/search/${type}?api_key=${API_KEY}&query=${term}&page=${page || 1}`;
    } else {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    const data = await response.json();

    res.status(200).json({ ...data, imageBaseUrl: IMAGE_BASE_URL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
