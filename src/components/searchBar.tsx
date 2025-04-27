import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";

interface Props {
  resetFilters?: () => void
}

export default function SearchBar({ resetFilters }: Props) {
  const [search, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState(search.get("query") ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(search.get("query") ?? ""); // Sync state with URL
    console.log(search.get('query'))
  }, [search]);

  // Debounce the URL update
  const updateSearchParams = useCallback(
    debounce((text) => {
      if (text.length === 0) {
        search.delete("query");
      } else {
        search.set("query", text);
      }
      navigate("/products"); // Navigate to products page

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
    search.delete("query"); // Remove query from URL
    setSearch(search, { replace: true }); // Update URL without adding to history
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
