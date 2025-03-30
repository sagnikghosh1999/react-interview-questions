import React, { useEffect, useRef } from "react";

const SuggestionList = ({ suggestions, onClick, highlight, activeIndex }) => {
  const suggestionsRef = useRef([]);

  //Function to highlight the searched text
  const generateSpanText = (highlight, text) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} className="highlighted-text">
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  useEffect(() => {
    if (activeIndex != null && suggestionsRef.current[activeIndex]) {
      suggestionsRef.current[activeIndex].scrollIntoView({
        behaviour: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <>
      {suggestions.length ? (
        <ul className="suggestion-list">
          {suggestions.length ? (
            suggestions?.map((recipe, index) => (
              <li
                key={recipe?.id}
                className={`suggestion-list-item ${
                  index === activeIndex ? "active" : ""
                }`}
                ref={(el) => (suggestionsRef.current[index] = el)}
                onClick={() => onClick(index)}
              >
                {generateSpanText(highlight, recipe.name)}
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default SuggestionList;
