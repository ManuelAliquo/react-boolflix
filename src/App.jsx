import axios from "axios";
import { useState } from "react";

export default function App() {
  const [titleSearch, setTitleSearch] = useState("");
  const [movieResults, setMovieResults] = useState(null);
  const [showsResults, setShowsResults] = useState(null);

  const handleChange = (e) => setTitleSearch(e.target.value);

  // sumbit + requests
  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c776b6b5f6e8888b99469b6b4512a77c&query=${titleSearch}`,
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieResults(res.data.results);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=c776b6b5f6e8888b99469b6b4512a77c&query=${titleSearch}`,
      )
      .then((res) => {
        console.log(res.data.results);
        setShowsResults(res.data.results);
      });
  };

  const flagUrl = (lang) => {
    if (lang === "en") return "https://flagsapi.com/US/flat/16.png";
    if (lang === "it") return "https://flagsapi.com/IT/flat/16.png";
    if (lang === "ja") return "https://flagsapi.com/JP/flat/16.png";
    return null;
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
        {movieResults && (
          <section className="movie-section">
            <h2>Movies</h2>
            <ul>
              {movieResults.map((res) => {
                return (
                  <ul key={res.id} className="p-0 border-bottom">
                    <li>Titolo: {res.title}</li>
                    <li>Titolo Originale: {res.original_title}</li>
                    <li>
                      {flagUrl(res.original_language) ? (
                        <img src={flagUrl(res.original_language)} alt="flag" />
                      ) : (
                        <span>Lingua: {res.original_language}</span>
                      )}
                    </li>
                    <li>Voto: {res.vote_average}</li>
                  </ul>
                );
              })}
            </ul>
          </section>
        )}
        {/* shows */}
        {showsResults && (
          <section className="show-section">
            <h2>TV Shows</h2>
            <ul>
              {showsResults.map((res) => {
                return (
                  <ul key={res.id} className="p-0 border-bottom">
                    <li>Titolo: {res.name}</li>
                    <li>Titolo Originale: {res.original_name}</li>
                    <li>
                      {flagUrl(res.original_language) ? (
                        <img src={flagUrl(res.original_language)} alt="flag" />
                      ) : (
                        <span>Lingua: {res.original_language}</span>
                      )}
                    </li>
                    <li>Voto: {res.vote_average}</li>
                  </ul>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
