function FilterToggle({ value, onChange }) {
  return (
    <div className="filter-toggle" role="tablist" aria-label="Movie list filter">
      <button
        type="button"
        className={value === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        All Movies
      </button>
      <button
        type="button"
        className={value === "watchlist" ? "active" : ""}
        onClick={() => onChange("watchlist")}
      >
        My Watchlist
      </button>
    </div>
  );
}

export default FilterToggle;
