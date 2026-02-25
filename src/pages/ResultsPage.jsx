import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

import { useSearch } from "../contexts/SearchContext";

import MovieCard from "../components/MovieCard";
import ShowCard from "../components/ShowCard";

export default function ResultsPage() {
  // flags function
  const flagUrl = (lang) => {
    if (lang === "en") return "https://flagsapi.com/US/flat/32.png";
    if (lang === "it") return "https://flagsapi.com/IT/flat/32.png";
    if (lang === "ja") return "https://flagsapi.com/JP/flat/32.png";
    return null;
  };

  const { movieResults, showsResults } = useSearch();

  const voteConversion = (vote) => {
    const rating = vote / 2;
    const finalRating = Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < finalRating; i++) {
      stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
    }

    for (let i = 0; i < 5 - finalRating; i++) {
      stars.push(<FontAwesomeIcon icon="fa-regular fa-star" />);
    }

    return stars;
  };

  return (
    <>
      {/* movies */}
      {movieResults.length > 0 && (
        <section className="movie-section">
          <h2 className="h3 fw-semibold">Movies</h2>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4">
            {movieResults.map((res) => {
              return <MovieCard key={res.id} res={res} flag={flagUrl} vote={voteConversion} />;
            })}
          </div>
        </section>
      )}
      {/* shows */}
      {showsResults.length > 0 && (
        <section className="show-section mt-3">
          <h2 className="h3 fw-semibold">TV Shows</h2>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4">
            {showsResults.map((res) => {
              return <ShowCard key={res.id} res={res} flag={flagUrl} vote={voteConversion} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}
