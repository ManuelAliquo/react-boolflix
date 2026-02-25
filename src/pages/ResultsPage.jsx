// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

// context hook import
import { useSearch } from "../contexts/SearchContext";

// components imports
import Card from "../components/Card";

const flagBaseUrl = "https://flagsapi.com/";

export default function ResultsPage() {
  // destructuring context hook
  const { movieResults, showsResults } = useSearch();

  // flags function
  const flagUrl = (lang) => {
    if (lang === "en") return `${flagBaseUrl}US/flat/32.png`;
    if (lang === "it") return `${flagBaseUrl}IT/flat/32.png`;
    if (lang === "ja") return `${flagBaseUrl}JP/flat/32.png`;
    return null;
  };

  // rating conversion function
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

  return movieResults.length === 0 && showsResults.length === 0 ? (
    <h1 className="my-5">Loading...</h1>
  ) : (
    <>
      {/* movies */}
      {movieResults.length > 0 && (
        <section className="movie-section">
          <h2 className="h3 fw-semibold">Movies</h2>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4">
            {movieResults.map((res) => {
              return (
                <Card key={res.id} res={res} flagUrl={flagUrl} voteConversion={voteConversion} />
              );
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
              return (
                <Card key={res.id} res={res} flagUrl={flagUrl} voteConversion={voteConversion} />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
