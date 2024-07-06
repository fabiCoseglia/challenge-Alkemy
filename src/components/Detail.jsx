import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Detail = () => {
    const token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    const imageURL = 'https://image.tmdb.org/t/p/w500';

    const [movie, setMovie] = useState(null)

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(token === null){
            navigate('/')
        }

        const endPoint=`https://api.themoviedb.org/3/movie/${movieID}?api_key=4a2f7b3e397206e302679fea2e35181c&language=es-ES`;
        
        axios.get(endPoint)
            .then( (res)=>{
                const movieData = res.data;
                setMovie(movieData)
            })
            .catch(error =>{console.log(error)})
    });

  return (
    <Row className="justify-content-center mt-5 p-4">
    {movie ? (
      <Card className="d-flex flex-column flex-md-row align-items-center p-2 w-75">
        <Image
          variant="top"
          fluid
          src={`${imageURL}${movie.poster_path}`}
          className="w-25"
          style={{ objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column p-3 w-100 w-md-75">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b>Fecha de estreno:</b> {movie.release_date}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Género:</b> {movie.genres[0].name}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Duración:</b> {movie.runtime} min
            </ListGroup.Item>
          </ListGroup>
          <Link className="btn btn-success mt-2 align-self-md-end" to="/">
            Volver a la lista
          </Link>
        </Card.Body>
      </Card>
    ) : (
      <Spinner animation="border" variant="success" />
    )}
  </Row>
  );
}
