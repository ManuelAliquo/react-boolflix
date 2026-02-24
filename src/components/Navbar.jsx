import axios from "axios";
import { useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [titleSearch, setTitleSearch] = useState("");
  const navigate = useNavigate();

  const { setMovieResults, setShowsResults } = useSearch();

  const handleChange = (e) => setTitleSearch(e.target.value);

  // sumbit + requests
  const formSubmit = (e) => {
    e.preventDefault();

    // movies request
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c776b6b5f6e8888b99469b6b4512a77c&query=${titleSearch}`,
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieResults(res.data.results);
      });

    // shows request
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=c776b6b5f6e8888b99469b6b4512a77c&query=${titleSearch}`,
      )
      .then((res) => {
        console.log(res.data.results);
        setShowsResults(res.data.results);
      });

    navigate("/results");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h1 className="h2 text-danger fw-bold mb-0">BOOLFLIX</h1>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <form onSubmit={formSubmit} className="d-flex" role="search">
            <input
              onChange={handleChange}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-danger" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
