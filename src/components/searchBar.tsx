import { useState, useEffect, useCallback } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SearchBar() {
  const [search, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState(search.get("query") ?? "");

  useEffect(() => {
    setInputValue(search.get("query") ?? ""); // Sync state with URL
  }, [search]);

  // Debounce only the URL update, not the input state
  const updateSearchParams = useCallback(
    debounce((text) => {
      if (text.length === 0) {
        search.delete("query");
      } else {
        search.set("query", text);
      }
      setSearch(search, { replace: true });
    }, 350),
    [search, setSearch]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text); // Update input field immediately
    updateSearchParams(text); // Debounced URL update
  };

  function handleClose() {
    setInputValue(""); // Clear input field
    search.delete("query");
    setSearch(search, { replace: true });
  }

  return (
    <div className="search">
      <input
        value={inputValue}
        onChange={onSearchChange}
        id="search"
        name="search"
        className="searchInput"
        type="search"
        placeholder="Find items by name..."
      />
      <label htmlFor="search" className="iconWrapper">
        {inputValue ? (
          <IoCloseCircleOutline onClick={handleClose} className="closeIcon" />
        ) : (
          <RiSearch2Line className="searchIcon" />
        )}
      </label>
    </div>
  );
}
