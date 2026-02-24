import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [results, setResults] = useState(null);

  const handleChange = (e) => setMovieTitle(e.target.value);

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c776b6b5f6e8888b99469b6b4512a77c&query=${movieTitle}`,
      )
      .then((res) => {
        console.log(res.data.results);
        setResults(res.data.results);
      });
  };

  return (
    <>
      <div className="container my-5">
        <form onSubmit={formSubmit}>
          <input onChange={handleChange} name="title-search" type="text" required />
          <button type="submit">Cerca</button>
        </form>

        {results && (
          <ul>
            {results.map((res) => (
              <ul className="border-bottom">
                <li>Titolo: {res.title}</li>
                <li>Titolo Originale: {res.original_title}</li>
                <li>Lingua: {res.original_language}</li>
                <li>Voto: {res.vote_average}</li>
              </ul>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
