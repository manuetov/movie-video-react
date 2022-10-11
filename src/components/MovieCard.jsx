import React from "react";
import Card from "react-bootstrap/Card";

const MovieCard = ({ movie, selectMovie}) => {
//   console.log(movie);
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  const img_URL = "https://image.tmdb.org/t/p/w500";

  return (
    
      <Card className='card m-3' 
         style={{ width: "18rem" }} 
         onClick={() => selectMovie(movie)}
      >
        {movie.poster_path ? (
          <Card.Img src={`${img_URL}${movie.poster_path}`} alt="Card image" />
        ) : null}
        <Card.Body>
         <Card.Title className='p-2 fs-3 fw-bold text-danger'>{movie.title}</Card.Title>
         <Card.Text>{movie.overview}</Card.Text>

        </Card.Body>
      </Card>
    
  );
};

export default MovieCard;
