import React from "react";

interface SearchBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <div className="flex justify-center bg-white">
      <form
        action=""
        method="get"
        className="flex items-center border border-gray-300 py-1 px-2 rounded-lg"
      >
        <label htmlFor="search-input" className="mr-2 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="rgb(107 114 128)"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </label>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="Type to search..."
          className="flex w-full rounded-md border-input bg-transparent p-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 anim resize-none"
          onChange={onSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
