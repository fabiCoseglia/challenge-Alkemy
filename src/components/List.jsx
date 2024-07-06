/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Image, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const List = ({ addOrRemoveFav }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [movieList, setMoviesList] = useState([]);
  const imageURL = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=4a2f7b3e397206e302679fea2e35181c&language=es-ES&page=1";

    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data;
        setMoviesList(apiData.results);
      })
      .catch(() => {
        Swal.fire({
          text: "Error con la base de datos, intenta más tarde",
          icon: "error",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Row className="row mt-4 m-2 justify-content-center gap-3">
        <h3 style={{ color: "darkslategray" }}>Películas más populares:</h3>
        {movieList.length === 0 && (
          <Spinner animation="border" variant="success" />
        )}
        {movieList.map((movie, i) => (
          <Col key={i} xs={10} md={2}>
            <Card style={{ position: "relative" }}>
              <Image src={`${imageURL}${movie.poster_path}`} thumbnail data-movieTitle={movie.title} />
              <Link
                data-movieID= {movie.id}
                to={`/detail?movieID=${movie.id}`}
                className="btn btn-success">Ver más</Link>
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
    </>
  );
};
