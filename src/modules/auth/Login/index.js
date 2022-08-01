import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    InputGroup,
    Button
} from 'reactstrap';
import { Eye, EyeOff } from "react-feather";
import { changePassword, changeShowPassword, changeUsername, initialState, submit } from './actions';
import { useNavigate } from 'react-router-dom';

function Login() {
    const state = useSelector(state => state.LoginReducer);
    const { isAuthenticated } = useSelector(state => state.global);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function forgotPassword() {
        navigate('/auths/forgot-password');
    }

    function register() {
        navigate('/auths/register');
    }

    useEffect(() => {
        if(isAuthenticated) navigate('/')
        else dispatch(initialState());
    }, [isAuthenticated]);

    return (
        <div>
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col md="6">
                        <h2 className='text-center'>Absensi StarConnect 2.0</h2>
                        <Card className='mt-4'>
                            <CardBody className="p-4 m-1">
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input value={state.username} className="border-secondary" type="email" style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorUsername ? true : false} onChange={(e) => dispatch(changeUsername(e.target.value))} />
                                    {
                                        state.errorUsername ? <FormFeedback className='font-weight-light text-danger pt-2'>{state.errorUsername}</FormFeedback> : null
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <InputGroup>
                                        <Input value={state.password} className="border-secondary border-end-0" type={state.showPassword ? 'text' : 'password'} style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorPassword ? true : false} onChange={(e) => dispatch(changePassword(e.target.value))} />
                                        <Button type="button" color="outline-secondary" onClick={() => dispatch(changeShowPassword())}>
                                            {state.showPassword ? (
                                                <Eye size={16} />
                                            ) : (
                                                <EyeOff size={16} />
                                            )}
                                        </Button>
                                    </InputGroup>
                                    {
                                        state.errorPassword ? <FormFeedback className='font-weight-light text-danger pt-2'>{state.errorPassword}</FormFeedback> : null
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <p className="d-flex justify-content-end" style={{ cursor: "pointer" }} onClick={() => forgotPassword()}>
                                        Forgot Password
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <Button
                                        onClick={() => dispatch(submit({ email: state.username, password: state.password }))}
                                        color="secondary"
                                        className="me-2 mt-2 w-100"
                                        disabled={state.isSubmited}
                                    >
                                        Login
                                    </Button>
                                </FormGroup>
                                <FormGroup>
                                    <p className="d-flex justify-content-center">
                                        or
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <p className="d-flex justify-content-center" style={{ cursor: "pointer" }} onClick={() => register()}>
                                        Register User
                                    </p>
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