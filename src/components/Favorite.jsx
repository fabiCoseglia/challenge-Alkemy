/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Alert, Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";

export const Favorite = ({addOrRemoveFav,favorites}) => {
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (token === null) {
           return navigate("/");
        }
    })

  return (
    <>
    <Container className="mt-4 m-2">
        <h2 style={{ color: "darkslategray" }}>Mis Favoritos:</h2>
    </Container>
    <>
      <Row className="row mt-4 m-1 justify-content-center gap-3">
        {
            favorites.length === 0 && (
                <Container className="d-flex justify-content-center w-50 flex-column align-items-center mt-4">
                    <Alert>
                        Aun no has seleccionados favoritos
                    </Alert>
                        <Link to={'/list'} className="btn btn-success">Ir a la lista</Link>
                </Container>
            )
        }
        {favorites.map((movie, i) => (
          <Col key={i} xs={10} md={2}>
            <Card style={{ position: "relative"}}>
              <Card.Title style={{ color: "darkslategray",height:'3.5rem' }} className="text-center"> {movie.title} </Card.Title>
              <Image src={movie.imgURL} thumbnail />
              <Link
                data-movieID= {movie.id}
                to={`/detail?movieID=${movie.id}`}
                className="btn btn-success">Ver más</Link>
                <Button className="mt-1" variant="danger" onClick={addOrRemoveFav}>Eliminar de Favoritos</Button>

            </Card>
          </Col>
        ))}
      </Row>
    </>
    </>
  )
}
