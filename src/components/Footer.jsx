import { Container } from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
      <Container fluid className="p-4 bg-dark text-white text-center mt-5">
        Development by: <b><small>@fabiCoseglia</small></b>
        <Container>
          <a href="https://www.linkedin.com/in/fabicoseglia/" target='_blank' className='text-success' >Linkedin</a>
        </Container>
      </Container>
    </>
  );
}
