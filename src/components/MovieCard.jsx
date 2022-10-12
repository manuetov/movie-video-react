import React from "react";
import Card from "react-bootstrap/Card";

const MovieCard = ({ movie, selectMovie }) => {
  //   console.log(movie);
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  const img_URL = "https://image.tmdb.org/t/p/w500";

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Card
      className="card bg-dark m-2"
      style={{ width: "18rem" }}
      onClick={() => selectMovie(movie)}
    >
      {movie.poster_path ? (
        <Card.Img src={`${img_URL}${movie.poster_path}`} alt="Card image" />
      ) : null}
      <Card.Body>
        <Card.Title className="p-2 fs-3 fw-bold text-danger">
          {movie.title}
        </Card.Title>
        <Card.Text>{truncate(movie?.overview, 100)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
