import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [movieResults, setMovieResults] = useState([]);
  const [showsResults, setShowsResults] = useState([]);

  const contextValue = { movieResults, setMovieResults, showsResults, setShowsResults };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

function useSearch() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearch };
