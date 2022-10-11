import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // GET /search/movie
  const [searchMovie, setSearchMovie] = useState("");

  // https://developers.themoviedb.org/3/discover/movie-discover
  const API_URL = "https://api.themoviedb.org/3";

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
    setMovies(results);
  };

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
      <MovieCard key={eachMovie.id} movie={eachMovie} />
    ));

  return (
    <Container fluid>
      <h1 className=''>NETFLUXKIX</h1>
      <Row className="d-flex justify-content-center">
        <header>
          <form onSubmit={searchMoviesSubmit}>
            {/* <Form */}
              <Form.Control 
                className="h-25 d-inline-block m-5"
                style={{ width: 500, backgroundColor: "rgba(0, 0, 255, 0.1)" }}
                type="text"
                placeholder="Buscar peli"
                onChange={(e) => setSearchMovie(e.target.value)}
              />
              <Button
                className="m-3"
                style={{ width: 120 }}
                variant="primary"
                type="submit"
              >
                Buscar
              </Button>

          </form>

          {searchMovie}
        </header>
        {renderMovies()}
      </Row>
    </Container>
  );
};

export default App;




/* <form className="form" onSubmit={searchMoviesSubmit}>
      <input className="search" type="text" id="search"
      onChange={(e) => setSearchMovie(e.target.value)}/>
      <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
    </form> */