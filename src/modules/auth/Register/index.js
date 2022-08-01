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
    Button,
    Form
} from 'reactstrap';
import { Eye, EyeOff } from "react-feather";
import { changeConfirmPassword, changeDomicile, changeEmail, changeGender, changeInterest, changeName, changePassword, changePhoneNumber, changeShowConfirmPassword, changeShowPassword, initialState, submit } from './actions';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../ui/fields/SelectField';
import GeneralField from '../../../ui/fields/GeneralField';

function Register() {
    const state = useSelector(state => state.RegisterReducer);
    const { isAuthenticated } = useSelector(state => state.global);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function login() {
        navigate('/auth/login');
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/')
        else dispatch(initialState());
    }, [isAuthenticated]);

    return (
        <div>
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col sm="12" md="10">
                        <h2 className='text-center'>Register Absensi <br /> StarConnect 2.0</h2>
                        <Card className='mt-4'>
                            <CardBody className="p-4 m-1">
                                <Form>
                                    <Row>
                                        <Col>
                                            <GeneralField title="Full Name" value={state.name} onChange={(e) => dispatch(changeName(e.target.value))} errorMessage={state.errorName} type="text" />
                                        </Col>
                                        <Col>
                                            <GeneralField title="Phone Number" value={state.phoneNumber} onChange={(e) => dispatch(changePhoneNumber(e.target.value))} errorMessage={state.errorPhoneNumber} type="number" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <GeneralField title="Email" value={state.email} onChange={(e) => dispatch(changeEmail(e.target.value))} errorMessage={state.errorEmail} type="email" />
                                        </Col>
                                        <Col>
                                            <SelectField isMulti={false} title="Gender" options={state.genders} onChange={(e) => dispatch(changeGender(e.target.value))} errorMessage={state.errorGender} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="password">Password</Label>
                                                <InputGroup>
                                                    <Input value={state.password} className={state.errorPassword ? " border-danger border-end-0" : "border-secondary border-end-0"} type={state.showPassword ? 'text' : 'password'} style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorPassword ? true : false} onChange={(e) => dispatch(changePassword(e.target.value))} />
                                                    <Button type="button" color={state.errorPassword ? "outline-danger" : "outline-secondary"} onClick={() => dispatch(changeShowPassword())}>
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
                                            </FormGroup></Col>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="password">Confirm Password</Label>
                                                <InputGroup>
                                                    <Input value={state.confirmPassword} className={state.errorConfirmPassword ? "border-danger border-end-0" : "border-secondary border-end-0"} type={state.showConfirmPassword ? 'text' : 'password'} style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorConfirmPassword ? true : false} onChange={(e) => dispatch(changeConfirmPassword(e.target.value))} />
                                                    <Button type="button" color={state.errorConfirmPassword ? "outline-danger" : "outline-secondary"} onClick={() => dispatch(changeShowConfirmPassword())}>
                                                        {state.showConfirmPassword ? (
                                                            <Eye size={16} />
                                                        ) : (
                                                            <EyeOff size={16} />
                                                        )}
                                                    </Button>
                                                </InputGroup>
                                                {
                                                    state.errorConfirmPassword ? <FormFeedback className='font-weight-light text-danger pt-2'>{state.errorConfirmPassword}</FormFeedback> : null
                                                }
                                            </FormGroup></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <SelectField isMulti={false} title="Domicile" options={state.domicilies} value={state.domicile} onChange={(e) => dispatch(changeDomicile(e.target.value))} errorMessage={state.errorDomicile} />
                                        </Col>
                                        <Col>
                                            <SelectField isMulti={false} title="Interest" options={state.interestList} value={state.interest} onChange={(e) => dispatch(changeInterest(e.target.value))} errorMessage={state.errorInterest} />
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Button
                                            onClick={() => dispatch(submit({
                                                email: state.email,
                                                phoneNumber: state.phoneNumber,
                                                name: state.name,
                                                password: state.password,
                                                confirmPassword: state.confirmPassword,
                                                gender: state.gender,
                                                interest: state.interest,
                                                domicile: state.domicile
                                            }))}
                                            color="secondary"
                                            className="me-2 mt-2 w-100"
                                            disabled={state.isSubmited}
                                        >
                                            Register
                                        </Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <p className="d-flex justify-content-center">
                                            or
                                        </p>
                                    </FormGroup>
                                    <FormGroup>
                                        <p className="d-flex justify-content-center" style={{ cursor: "pointer" }} onClick={() => login()}>
                                            Already registered ?
                                        </p>
                                    </FormGroup>
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;