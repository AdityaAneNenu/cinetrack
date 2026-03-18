import { useEffect, useMemo, useState } from "react";
import FilterToggle from "../components/FilterToggle";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";
import { useWatchlist } from "../context/WatchlistContext";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/tmdb";
import "./home.css";

function HomePage() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Start typing to search movies.");
  const [view, setView] = useState("all");
  const debouncedQuery = useDebounce(query, 400);
  const { watchlist } = useWatchlist();

  useEffect(() => {
    async function runSearch() {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        setStatus("idle");
        setMessage("Start typing to search movies.");
        return;
      }

      setStatus("loading");
      setMessage("Loading movies...");

      try {
        const results = await searchMovies(debouncedQuery.trim());
        setMovies(results);

        if (results.length === 0) {
          setStatus("empty");
          setMessage("No results found.");
        } else {
          setStatus("success");
          setMessage("");
        }
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "API Error. Please try again.");
      }
    }

    runSearch();
  }, [debouncedQuery]);

  const displayedMovies = useMemo(() => {
    if (view === "watchlist") {
      return watchlist;
    }
    return movies;
  }, [movies, view, watchlist]);

  return (
    <main className="page">
      <header className="hero">
        <h1>CineTrack</h1>
        <p>Discover movies, save favorites, and revisit your watchlist anytime.</p>
      </header>

      <section className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <FilterToggle value={view} onChange={setView} />
      </section>

      {status === "loading" && view === "all" ? <div className="spinner" aria-label="Loading" /> : null}

      {view === "all" && status !== "success" && status !== "loading" ? (
        <StatusMessage text={message} type={status === "error" ? "error" : "info"} />
      ) : null}

      {view === "watchlist" && displayedMovies.length === 0 ? (
        <StatusMessage text="Your watchlist is empty." type="info" />
      ) : null}

      {displayedMovies.length > 0 ? <MovieGrid movies={displayedMovies} /> : null}
    </main>
  );
}

export default HomePage;
