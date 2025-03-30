import { useEffect, useState } from "react";
import SuggestionList from "./SuggestionList";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(false);
  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelected(() => false);
  };

  const fetchData = (query) => {
    setLoading(true);
    setError("");

    const savedData = JSON.parse(localStorage.getItem(`cache-${query}`));

    if (savedData) {
      setLoading(false);
      setSuggestions(savedData);
      return;
    }

    fetch(`https://dummyjson.com/recipes/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data?.recipes);
        localStorage.setItem(`cache-${query}`, JSON.stringify(data?.recipes));
      })
      .catch((err) => setError(`Error : ${err.message}`))
      .finally(() => setLoading(false));
  };

  const handleClick = (index) => {
    setQuery(suggestions[index].name);
    setActiveIndex(null);
    setSuggestions([]);
    setSelected(() => true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeIndex === null) return;
      handleClick(activeIndex);
    } else if (e.key === "ArrowDown") {
      if (activeIndex === null || activeIndex === suggestions.length - 1)
        setActiveIndex(0);
      else setActiveIndex((prev) => prev + 1);
    } else if (e.key === "ArrowUp") {
      if (activeIndex === 0) setActiveIndex(suggestions.length - 1);
      else setActiveIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setActiveIndex(null);
      setSuggestions([]);
      return;
    }
    if (selected) {
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      fetchData(query);
    }, 300);

    return () => {
      setLoading(false);
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <div className="container">
        {/* Inputbox  */}
        <div className="search-input">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* SuggestionList */}
        {loading ? (
          <div className="suggestion-list">
            <div className="suggestion-list-item">Loading...</div>
          </div>
        ) : (
          <>
            {error && (
              <div className="suggestion-list">
                <div className="suggestion-list-item" style={{ color: "red" }}>
                  {error}
                </div>
              </div>
            )}
            {query.trim() && !loading && !selected && !suggestions.length && (
              <div className="suggestion-list">
                <div className="suggestion-list-item">
                  Sorry No results found...
                </div>
              </div>
            )}
            <SuggestionList
              suggestions={suggestions}
              highlight={query}
              activeIndex={activeIndex}
              onClick={handleClick}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Autocomplete;
