import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

const FALLBACK_POSTER =
  "https://via.placeholder.com/500x750/eaf1ff/203050?text=No+Poster";

function MovieCard({ movie }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const added = isInWatchlist(movie.id);

  function handleWatchlist(event) {
    event.preventDefault();
    if (added) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img
          src={movie.poster || FALLBACK_POSTER}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_POSTER;
          }}
        />
        <div className="movie-meta">
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
        </div>
      </Link>
      <button type="button" className="watch-btn" onClick={handleWatchlist}>
        {added ? "Remove" : "Add to Watchlist"}
      </button>
    </article>
  );
}

export default MovieCard;
