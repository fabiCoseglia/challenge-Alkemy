import { Button, Form, Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const Login = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const handleSubmit = e =>{
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if(email === '' | password === ''){
      Swal.fire({
          text: "Los campos no deben estar vacíos",
          icon: "error"
        });
      return;
    }

    if(email !== '' && !emailRegex.test(email)){
      Swal.fire({
          text: "Debes escribir un mail válido",
          icon: "error"
        });
      return;
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react'){
      Swal.fire({
          text: "Credenciales inválidas",
          icon: "error"
        });
      return;
    }
    axios.post('http://challenge-react.alkemy.org',{email,password})
            .then(res => {
                Swal.fire({
                    text: "Ingresaste con éxito",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                  });
                const data = {
                  token: res.data.token,
                  username: 'AlkemyUser'
                };
                sessionStorage.setItem('token',data.token);
                sessionStorage.setItem('username',data.username);
                navigate('/list')
            });
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{height:'80vh'}}>
      {useEffect( ()=>{
    if(token){
      navigate('/list')
    }
  })}
      <Image src={logo}  width={'100rem'}/>
    <Form className='m-4' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail" >
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese email" name='email' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>
      <Button type='submit' variant='success'>Enviar</Button>
    </Form>
  </div>
  )
}
