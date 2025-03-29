import React, { useEffect, useRef, useState } from "react";
import Pill from "./Pill";

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeIndex, setActiveindex] = useState(null);
  const [selectedProductsSet, setSelectedProductsSet] = useState(new Set());

  //   const suggestionListRef = useRef(null);
  const itemRefs = useRef([]);

  const fetchData = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data?.products))
      .catch((err) => console.log(err));
  };

  const inputRef = useRef();
  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setSelectedProductsSet(new Set([...selectedProductsSet, product.id]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveProduct = (product) => {
    const updatedProducts = selectedProducts.filter(
      (prod) => prod.id != product.id
    );
    setSelectedProducts(updatedProducts);
    const updatedProductsSet = new Set(selectedProductsSet);
    updatedProductsSet.delete(product.id);
    setSelectedProductsSet(updatedProductsSet);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedProducts.length > 0
    ) {
      const lastProduct = selectedProducts[selectedProducts.length - 1];
      handleRemoveProduct(lastProduct);
      setSuggestions([]);
    } else if (e.key === "Enter") {
      if (
        activeIndex !== null &&
        suggestions[activeIndex] &&
        !selectedProductsSet.has(suggestions[activeIndex].id)
      ) {
        handleSelectProduct(suggestions[activeIndex]);
        setActiveindex(null);
      }
    } else if (e.key === "ArrowDown") {
      let nextIndex =
        activeIndex === null || activeIndex === suggestions.length - 1
          ? 0
          : activeIndex + 1;
      while (
        nextIndex < suggestions.length &&
        selectedProductsSet.has(suggestions[nextIndex]?.id)
      ) {
        nextIndex++;
      }
      if (nextIndex < suggestions.length) {
        setActiveindex(nextIndex);
      }
    } else if (e.key === "ArrowUp") {
      let prevIndex =
        activeIndex === 0 ? suggestions.length - 1 : activeIndex - 1;
      while (
        prevIndex >= 0 &&
        selectedProductsSet.has(suggestions[prevIndex]?.id)
      ) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        setActiveindex(prevIndex);
      }
    }
  };

  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchTerm);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div className="product-search-container">
      <div className="product-search-input">
        {/* Pills */}
        {selectedProducts.map((product, id) => (
          <Pill
            key={id}
            image={product.thumbnail}
            text={product.title}
            onClick={() => handleRemoveProduct(product)}
          />
        ))}
        {/* Searchbox  */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            onKeyDown={handleKeyDown}
          />
          {/* SuggestionList  */}
          {suggestions.length ? (
            <ul
              className="suggestions-list"
              //  ref={suggestionListRef}
            >
              {suggestions.map((product, idx) =>
                !selectedProductsSet.has(product?.id) ? (
                  <li
                    key={`${idx}-${product?.title}`}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => handleSelectProduct(product)}
                    className={activeIndex === idx ? "active" : ""}
                  >
                    <img src={product?.thumbnail} alt={product?.title} />
                    <span>{product?.title}</span>
                  </li>
                ) : (
                  <></>
                )
              )}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
