import React from "react";
import Card from "react-bootstrap/Card";

const MovieCard = ({ movie }) => {
  console.log(movie);
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  const img_URL = "https://image.tmdb.org/t/p/w500";

  return (
    
      <Card style={{ width: "18rem" }}>
        {movie.poster_path ? (
          <Card.Img src={`${img_URL}${movie.poster_path}`} alt="poster" />
        ) : null}
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview}</Card.Text>
      </Card>
    
  );
};

export default MovieCard;
