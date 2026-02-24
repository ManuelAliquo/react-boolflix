import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from "../contexts/SearchContext";

export default function ResultsPage() {
  // flags function
  const flagUrl = (lang) => {
    if (lang === "en") return "https://flagsapi.com/US/flat/16.png";
    if (lang === "it") return "https://flagsapi.com/IT/flat/16.png";
    if (lang === "ja") return "https://flagsapi.com/JP/flat/16.png";
    return null;
  };

  const { movieResults, setMovieResults, showsResults, setShowsResults } = useSearch();

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
    </>
  );
}
