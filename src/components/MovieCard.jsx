export default function MovieCard({ res, flag, vote }) {
  const imgUrl = res.poster_path
    ? "https://image.tmdb.org/t/p/original/" + res.poster_path
    : "src/assets/img/undefined_poster.png";

  return (
    <div className="col">
      <div className="card border-0 h-100">
        <img className="card-img" src={imgUrl} alt="poster" />
      </div>
    </div>
  );
}

// <div className="card">
//   <img src={"https://image.tmdb.org/t/p/original/" + res.poster_path} alt="poster" />
//   <ul className="list-unstyled">
//     <li>Titolo: {res.title}</li>
//     <li>Titolo Originale: {res.original_title}</li>
//     <li>
//       {flag(res.original_language) ? (
//         <img src={flag(res.original_language)} alt="flag" />
//       ) : (
//         <span>Lingua: {res.original_language}</span>
//       )}
//     </li>
//     <li>Voto: {vote(res.vote_average)}</li>
//   </ul>
// </div>
