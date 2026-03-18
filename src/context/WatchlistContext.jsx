import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadWatchlist, saveWatchlist } from "../utils/storage";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => loadWatchlist());

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const value = useMemo(() => {
    function isInWatchlist(movieId) {
      return watchlist.some((movie) => movie.id === movieId);
    }

    function addToWatchlist(movie) {
      setWatchlist((previous) => {
        if (previous.some((item) => item.id === movie.id)) {
          return previous;
        }
        return [movie, ...previous];
      });
    }

    function removeFromWatchlist(movieId) {
      setWatchlist((previous) => previous.filter((movie) => movie.id !== movieId));
    }

    return {
      watchlist,
      isInWatchlist,
      addToWatchlist,
      removeFromWatchlist
    };
  }, [watchlist]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
}
