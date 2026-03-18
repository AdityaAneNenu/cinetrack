import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <section className="movie-grid" aria-live="polite">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieGrid;
