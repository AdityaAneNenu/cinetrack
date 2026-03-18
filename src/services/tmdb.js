const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function getAuthToken() {
  const token = (import.meta.env.VITE_TMDB_API_KEY || "").trim();

  if (!token) {
    throw new Error("Missing TMDB token. Add VITE_TMDB_API_KEY in .env");
  }

  return token.replace(/^Bearer\s+/i, "");
}

function getDefaultHeaders() {
  return {
    accept: "application/json",
    Authorization: `Bearer ${getAuthToken()}`
  };
}

function mapMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    poster: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "",
    rating: movie.vote_average || 0,
    voteCount: movie.vote_count || 0,
    overview: movie.overview || "No description available.",
    genres: movie.genres ? movie.genres.map((g) => g.name) : []
  };
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: getDefaultHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movies right now.");
  }

  const data = await response.json();
  return (data.results || []).map(mapMovie);
}

export async function getMovieById(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    method: "GET",
    headers: getDefaultHeaders()
  });

  if (!response.ok) {
    throw new Error("Unable to fetch movie details.");
  }

  const movie = await response.json();
  return mapMovie(movie);
}
