import { Button, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Search = () => {
    const navigate = useNavigate();
    const submitHandler = e =>{
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();

        if(keyword.length === 0){
            Swal.fire({
                text: "Los campos del buscador no deben estar vacíos",
                icon: "error"
              });
        }else if(keyword.length < 4){
            Swal.fire({
                text: "Debes escribir más de 4 caracteres",
                icon: "error"
              });
        }else{
            e.target.keyword.value = '';
            navigate(`/results?keyword=${keyword}`)
        }
    }

  return (
    <Form inline onSubmit={submitHandler}>
        <Row>
          <Col xs="7">
            <Form.Control
              name="keyword"
              type="text"
              placeholder="Buscar..."
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="1" className="d-flex gap-1">
            <Button type="submit" variant="success" >Enviar</Button>
          </Col>
        </Row>
      </Form>
  )
}
