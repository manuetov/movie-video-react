import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import YouTube from 'react-youtube';
import './app.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const App = () => {
  // https://developers.themoviedb.org/3/discover/movie-discover
  const API_URL = "https://api.themoviedb.org/3";
  // https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
  const IMAGE_PATH = 'http://image.tmdb.org/t/p/original/'

  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // GET /search/movie
  const [searchMovie, setSearchMovie] = useState("");
  const [selectedMovie, setSelectedMovie] = useState ({})
  const [playTrailer, setPlayTrailer] = useState(false)

  // all movies
  const getMovies = async (searchMovie) => {
    // solo si se hace una busqueda sino se muestra discover/movie
    const type = searchMovie ? "search" : "discover";
    const {data: { results }} = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchMovie,
      },
    });
    // console.log(results);
    setIsFetching(false);
    let randomResults = Math.floor(Math.random() * results.length);
    selectMovie(results[randomResults])
    setMovies(results);
  };

  // https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos
  // select on movie
  const getMovie = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        append_to_response: 'videos',
      }
    })
    return data    
  }

  const selectMovie = async (movie) => {
    const dataMovie = await getMovie(movie.id)
    console.log('data', dataMovie)
    setSelectedMovie(dataMovie)
  }

  useEffect(() => {
    getMovies();
  }, []);

  // console.log(movies);
  if (isFetching) {
    return <h2>... isFetching</h2>;
  }

  const searchMoviesSubmit = (e) => {
    e.preventDefault();
    getMovies(searchMovie);
  };

  const renderMovies = () =>
    movies.map((eachMovie) => (
      <MovieCard 
        key={eachMovie.id} 
        movie={eachMovie}
        selectMovie={selectMovie} 
      />
    ));
  
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find((eachVideo) => eachVideo.name === 'Official Trailer')
    return  (
      <YouTube 
        videoId = {trailer.key} 
        className = {'youtube-container'}
        const opts = {{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1
          }
        }}
      />
    )
  }
  

  return (
    <Container fluid>
      <h1 className=''>NETFLUXKIX</h1>
      <Row className="d-flex justify-content-center">
        <header>
        <div className="portada" style={{backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}>
            <div className="portada-content">
              {playTrailer ? <Button variant='dark'
                className="position-absolute top-0 start-50 translate-middle"
                style={{zIndex: '100'}}  
                onClick={() => setPlayTrailer(false)}>Cerrar</Button> : null}
              {/* renderTrailer */}
              {playTrailer && selectedMovie.videos ? renderTrailer() : null}
              <Button variant="outline-info" onClick={() => setPlayTrailer(true)}>Play Trailer</Button>
              <h1>{selectedMovie.title}</h1>
              {selectedMovie.overview ? <p>{selectedMovie.overview}</p> : null}
            </div>
          </div>
          {/* <Form */}
        </header>
          <form onSubmit={searchMoviesSubmit}>
              <Form.Control 
                className="h-50 d-inline-block m-3 text-info"
                style={{ width: 500, backgroundColor: "rgba(0, 0, 255, 0.1)" }}
                type="text"
                placeholder="Buscar peli"
                onChange={(e) => setSearchMovie(e.target.value)}
              />
              <Button
                style={{ width: 120 }}
                variant="primary"
                type="submit"
              >
                Buscar
              </Button>
          </form>
          
        {renderMovies()}
      </Row>
    </Container>
  );
};

export default App;




