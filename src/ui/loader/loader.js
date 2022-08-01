import React from "react";
import { Spinner, Container, Row } from "reactstrap";

const Loader = () => (
  <Container className="vh-100">
    <Row className="justify-content-center align-items-center h-100">
      <Spinner color="primary" />
    </Row>
  </Container>
);

export default Loader;