import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { useWatchlist } from "../context/WatchlistContext";
import { getMovieById } from "../services/tmdb";

const FALLBACK_POSTER =
  "https://via.placeholder.com/500x750/eaf1ff/203050?text=No+Poster";

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError("");

      try {
        const result = await getMovieById(id);
        setMovie(result);
      } catch (loadError) {
        setError(loadError.message || "Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="page detail-page">
        <div className="spinner" aria-label="Loading" />
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="page detail-page">
        <StatusMessage text={error || "Movie not found."} type="error" />
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </main>
    );
  }

  const added = isInWatchlist(movie.id);

  return (
    <main className="page detail-page">
      <Link to="/" className="back-link">
        Back to Home
      </Link>
      <article className="detail-card">
        <img
          src={movie.poster || FALLBACK_POSTER}
          alt={`${movie.title} poster`}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_POSTER;
          }}
        />
        <div>
          <h1>{movie.title}</h1>
          <p className="detail-muted">Year: {movie.year}</p>
          <p className="detail-muted">Rating: {movie.rating.toFixed(1)} / 10</p>
          <p className="detail-muted">Votes: {movie.voteCount}</p>
          <p className="detail-muted">
            Genre: {movie.genres.length > 0 ? movie.genres.join(", ") : "N/A"}
          </p>
          <p>{movie.overview}</p>
          <button
            type="button"
            className="watch-btn"
            onClick={() => (added ? removeFromWatchlist(movie.id) : addToWatchlist(movie))}
          >
            {added ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </article>
    </main>
  );
}

export default MovieDetailPage;
