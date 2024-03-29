import React from "react";
import Card from "react-bootstrap/Card";

const MovieCard = ({ movie, selectMovie }) => {
  //   console.log(movie);
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  const img_URL = "https://image.tmdb.org/t/p/w500";

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleSroll = () => {
    selectMovie(movie)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
  }
  
  return (
    <Card
      className="card bg-dark m-2"
      style={{ width: "14rem" }}
      onClick={handleSroll} 
    >
      {movie.poster_path ? (
        <Card.Img src={`${img_URL}${movie.poster_path}`} alt="Card image" className='mt-3' />
      ) : null}
      <Card.Body>
        <Card.Title className="fs-4 pb-2 fw-bold text-danger">
          {movie.title}
        </Card.Title>
        <Card.Subtitle className="pb-2 text-white">{movie.release_date}</Card.Subtitle>
        <Card.Text>{truncate(movie?.overview, 100)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
