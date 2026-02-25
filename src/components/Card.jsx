import { useState } from "react";

export default function Card({ res, flagUrl, voteConversion }) {
  const [hovered, setHovered] = useState(false);

  const imgUrl = res.poster_path
    ? "https://image.tmdb.org/t/p/original/" + res.poster_path
    : "src/assets/img/undefined_poster.png";

  const handleOnMouseEnter = () => {
    setHovered(true);
  };
  const handleOnMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="col">
      <div className="card border-0 h-100 position-relative">
        <img className="card-img" src={imgUrl} alt="poster" />
        {hovered && (
          <ul className="list-unstyled w-100 h-100 text-center text-white">
            <li className="pb-1">{res.title ?? res.name}</li>
            <li className="border-top py-1">
              Original title: "{res.original_title ?? res.original_name}"
            </li>
            <li className="border-top pt-1">
              {flagUrl(res.original_language) ? (
                <img src={flagUrl(res.original_language)} alt="flag" />
              ) : (
                <span>Lang: {res.original_language}</span>
              )}
            </li>
            <li className="py-1">{voteConversion(res.vote_average)}</li>
            <li className="border-top pt-1">
              <p>{res.overview}</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
