/* eslint-disable react/prop-types */
import { Col, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Search } from "./Search"

export const Header = ({favorites}) => {
  const token = sessionStorage.getItem("token");

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <b><Link to={'/'} className="navbar-brand text-white">Alkemy-<span className="text-success">Challenge</span></Link></b>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!token && <Container></Container>}
        <Navbar.Collapse id="basic-navbar-nav">
          {token &&
          <Nav className="me-auto">
             { 
              favorites.length > 0 &&
              <Col className="d-flex gap-2" md={2}>
                <Link to={'/favorites'}className="text-white nav-link">Favoritos:</Link>
                <span className="rounded-pill bg-danger p-2 text-white mb-1">{favorites.length}</span>
              </Col>
             }
          </Nav>
          }
          <Search/>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
