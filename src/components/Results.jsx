/* eslint-disable react/prop-types */
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Image, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Results = ({addOrRemoveFav}) => {
    
    const navigate = useNavigate();
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
    const [moviesResult,setMovieResults] = useState([]);
    const imageURL = 'https://image.tmdb.org/t/p/w500';
    const endPoint=`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=es-ES&page=1&api_key=4a2f7b3e397206e302679fea2e35181c`;
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        
        if(!token){
          Swal.fire({
            text: "Debes iniciar sesion para usar el buscador",
            icon: "error",
          });
          return navigate('/')
          
        }

        axios.get(endPoint)
            .then(res=>{
                const moviesData = res.data.results;
                if(moviesData.length === 0 ){
                    Swal.fire({
                        text: "Tu busqueda no tuvo resultados",
                        icon: "error",
                        confirmButtonText:'Volver al listado'
                    });
                    navigate('/list')
                }
                setMovieResults(moviesData);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[keyword])
  return (
    <Row className="row mt-4 m-1 justify-content-center gap-3">
    <h3 style={{color:'darkslategray'}}>Resultados de busqueda para: {keyword} </h3>
      {moviesResult.length === 0 && <Spinner animation="border" variant="success" />}
      {moviesResult.map((movie, i) => (

        <Col key={i} xs={10} md={2} >
          <Card style={{ cursor: 'pointer' }}>
          <Image src={`${imageURL}${movie.poster_path}`} thumbnail data-movieTitle={movie.title} />
          <Link to={`/detail?movieID=${movie.id}`} className="btn btn-success" data-movieID= {movie.id} >Ver más</Link>
          <FontAwesomeIcon onClick={addOrRemoveFav}
                className="heart-icon"
                icon={faHeart}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "8px",
                  cursor: "pointer",
                  height: "2rem",
                }}/>
          </Card>
        </Col>

      ))}
    </Row>
  )
}
