function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search Movies</label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try: Inception, Avatar, Interstellar..."
      />
    </div>
  );
}

export default SearchBar;
