// axios import
import axios from "axios";
// context hook import
import { useSearch } from "../contexts/SearchContext";
// react-router import
import { useNavigate, NavLink } from "react-router-dom";

import { useState } from "react";

const baseUrl = `https://api.themoviedb.org/3/search/`;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Navbar() {
  // search state
  const [titleSearch, setTitleSearch] = useState("");

  // destructuring context hook
  const { setMovieResults, setShowsResults } = useSearch();

  // navigate
  const navigate = useNavigate();

  // search handler
  const handleChange = (e) => setTitleSearch(e.target.value);

  // sumbit + requests
  const formSubmit = (e) => {
    e.preventDefault();

    // movies request
    axios.get(`${baseUrl}movie?api_key=${apiKey}&query=${titleSearch}`).then((res) => {
      setMovieResults(res.data.results);
    });

    // shows request
    axios.get(`${baseUrl}tv?api_key=${apiKey}&query=${titleSearch}`).then((res) => {
      setShowsResults(res.data.results);
    });

    navigate("/results");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="h4 fw-bold mb-0 mx-5">BOOLFLIX</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <NavLink to="/" className="nav-link mt-1">
              Home
            </NavLink>
            <form onSubmit={formSubmit} className="navbar-search p-1" role="search">
              <button className="navbar-search-btn text-white" id="button-addon1">
                <i className="bi bi-search"></i>
              </button>
              <input
                onChange={handleChange}
                name="search"
                type="text"
                className="navbar-search-input text-white"
                placeholder="Search Titles"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                required
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
