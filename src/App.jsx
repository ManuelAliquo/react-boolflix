import axios from "axios";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

export default function App() {
  const [titleSearch, setTitleSearch] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [showsResults, setShowsResults] = useState([]);

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
  };

  // flags function
  const flagUrl = (lang) => {
    if (lang === "en") return "https://flagsapi.com/US/flat/16.png";
    if (lang === "it") return "https://flagsapi.com/IT/flat/16.png";
    if (lang === "ja") return "https://flagsapi.com/JP/flat/16.png";
    return null;
  };

  const voteConversion = (vote) => {
    const rating = vote / 2;
    const roundedRating = Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < roundedRating; i++) {
      stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
    }

    for (let i = 0; i < 5 - roundedRating; i++) {
      stars.push(<FontAwesomeIcon icon="fa-regular fa-star" />);
    }

    return stars;
  };

  return (
    <>
      <div className="container my-5">
        {/* search */}
        <form onSubmit={formSubmit}>
          <input onChange={handleChange} name="title-search" type="text" required />
          <button>Cerca</button>
        </form>
        {/* movies */}
        {movieResults.length > 0 && (
          <section className="movie-section">
            <h2>Movies</h2>
            <ul>
              {movieResults.map((res) => {
                return (
                  <div key={res.id} className="card">
                    <img
                      src={"https://image.tmdb.org/t/p/original/" + res.poster_path}
                      alt="poster"
                    />
                    <ul className="list-unstyled">
                      <li>Titolo: {res.title}</li>
                      <li>Titolo Originale: {res.original_title}</li>
                      <li>
                        {flagUrl(res.original_language) ? (
                          <img src={flagUrl(res.original_language)} alt="flag" />
                        ) : (
                          <span>Lingua: {res.original_language}</span>
                        )}
                      </li>
                      <li>Voto: {voteConversion(res.vote_average)}</li>
                    </ul>
                  </div>
                );
              })}
            </ul>
          </section>
        )}
        {/* shows */}
        {showsResults.length > 0 && (
          <section className="show-section">
            <h2>TV Shows</h2>
            <ul>
              {showsResults.map((res) => {
                return (
                  <div key={res.id} className="card">
                    <img
                      src={"https://image.tmdb.org/t/p/original/" + res.poster_path}
                      alt="poster"
                    />
                    <ul className="list-unstyled">
                      <li>Titolo: {res.name}</li>
                      <li>Titolo Originale: {res.original_name}</li>
                      <li>
                        {flagUrl(res.original_language) ? (
                          <img src={flagUrl(res.original_language)} alt="flag" />
                        ) : (
                          <span>Lingua: {res.original_language}</span>
                        )}
                      </li>
                      <li>Voto: {voteConversion(res.vote_average)}</li>
                    </ul>
                  </div>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
