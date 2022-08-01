import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

function Login() {
    const state = useSelector(state => state.LoginReducer);

    return (
        <div>
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col md="6">
                        <h2 className='text-center'>Admin <br /> React X Spring Boot</h2>
                        <Card className='mt-4'>
                            <CardBody className="p-4 m-1">
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input value={state.username} type="email" style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorUsername} />
                                    {
                                        state.errorUsername ? <p className='font-weight-light text-danger pt-2'>{state.errorUsername}</p> : null
                                    }
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;