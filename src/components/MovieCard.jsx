import { useState } from "react";

export default function MovieCard({ res, flag, vote }) {
  const [isHovered, setIsHovered] = useState(false);

  const imgUrl = res.poster_path
    ? "https://image.tmdb.org/t/p/original/" + res.poster_path
    : "src/assets/img/undefined_poster.png";

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };
  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="col">
      <div className="card border-0 h-100 position-relative">
        <img className="card-img" src={imgUrl} alt="poster" />
        {isHovered && (
          <ul className="list-unstyled w-100 h-100 text-center text-white">
            <li>Title: {res.title}</li>
            <li>Original Title: {res.original_title}</li>
            <li>
              {flag(res.original_language) ? (
                <img src={flag(res.original_language)} alt="flag" />
              ) : (
                <span>Language: {res.original_language}</span>
              )}
            </li>
            <li>Rating: {vote(res.vote_average)}</li>
            <li>
              <p>{res.overview}</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
