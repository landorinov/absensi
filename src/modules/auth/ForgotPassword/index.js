import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    Button,
} from 'reactstrap';
import Loading from '../../../ui/modals/Loading';
import Success from '../../../ui/modals/Success';
import { back, changeConfirm, changeEmail, changeOtp, changeOtpSuccess, changePassword, initialState, resendOtp, submitEmail, submitPassword } from './actions';
import './index.css';

function ForgotPassword() {
    const state = useSelector(state => state.ForgotReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(initialState());
    }, []);

    useEffect(() => {
        if(state.submitSuccess){
            setTimeout(() => {
                dispatch(initialState());
                navigate('/auths/login')
            }, 3000);
        }
    }, [state.submitSuccess]);

    useEffect(() => {
        if(state.successResend){
            setTimeout(() => {
                dispatch(changeOtpSuccess());
            }, 3000);
        }
    }, [state.successResend]);

    return (
        <div>
            <Container className="vh-100">
                    <div className='text-center' style={{marginTop: "20%"}}>
                        <h4>Forgot Password</h4>
                        <h2>Absensi StarCon</h2>
                    </div>
                <Row className="justify-content-center align-items-center">
                    <Col md="6" className='text-center'>
                        {
                            state.successResend ? <Success show={state.successResend} title={`Success resend otp to ${state.email}`} /> : null
                        }
                        {
                            state.submitSuccess ? <Success show={state.submitSuccess} title="Success to change password" /> : null
                        }
                        {
                            state.isSubmitedForgot ? <Loading show={state.isSubmitedForgot} /> : null
                        }
                        {
                            state.step === 0 ? (
                            <> 
                                <FormGroup className='pt-5'>
                                    <p className="d-flex justify-content-center">
                                        Please enter your E-mail registered in this application
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <Input onChange={(e) => dispatch(changeEmail(e.target.value))} className='border-top-0 border-start-0 border-end-0 border-bottom forgot-input text-center' value={state.email} type="email" style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} invalid={state.errorEmail} />
                                    {
                                        state.errorEmail ? <p className='font-weight-light text-danger pt-2'>{state.errorEmail}</p> : null
                                    }
                                </FormGroup> 
                                <FormGroup>
                                    <Button
                                        onClick={() => dispatch(submitEmail(state.email))}
                                        color="secondary"
                                        className="me-2 mt-2 w-100"
                                        disabled={state.isSubmited}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/auths/login')}
                                        color="transparent"
                                        className="me-2 mt-2 w-100"
                                        disabled={state.isSubmited}
                                    >
                                        Back to Login
                                    </Button>
                                </FormGroup> 
                            </>
                            ) : null
                        }   
                        {
                            state.step === 1 ? (
                            <> 
                                <FormGroup className='pt-5'>
                                    <p className="d-flex justify-content-center">
                                        Your OTP already send to <span style={{fontWeight: "bold", color: "blue", paddingLeft: "5px"}}>{state.email}</span>
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <Input onChange={(e) => dispatch(changeOtp({email: state.email, value: e.target.value}))} className='border-top-0 border-start-0 border-end-0 border-bottom text-center forgot-input' value={state.otp} type="text" style={{ paddingTop: "0.7em", paddingBottom: "0.7em"}} invalid={state.errorOtp} maxLength={4} />
                                    {
                                        state.errorOtp ? <p className='font-weight-light text-danger pt-2'>{state.errorOtp}</p> : null
                                    }
                                </FormGroup> 
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <p className="d-flex justify-content-center" style={{ cursor: "pointer" }} onClick={() => dispatch(back())}>
                                                Back
                                            </p>
                                        </Col>
                                        <Col>
                                            <p className="d-flex justify-content-center" style={{ cursor: "pointer", color: "blue" }} onClick={() => dispatch(resendOtp(state.email))}>
                                                Resend OTP
                                            </p>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </>
                            ) : null
                        }  
                        {
                            state.step === 2 ? (
                            <> 
                                <FormGroup className='pt-5'>
                                    <p className="d-flex justify-content-center">
                                        Change your password
                                    </p>
                                </FormGroup>
                                    <FormGroup>
                                        <Input onChange={(e) => dispatch(changePassword(e.target.value))} placeholder='New Password' className='border-top-0 border-start-0 border-end-0 border-bottom text-center forgot-input' value={state.newPassword} type="text" style={{ paddingTop: "0.7em", paddingBottom: "0.7em"}} invalid={state.errorPassword} />
                                        {
                                            state.errorPassword ? <p className='font-weight-light text-danger pt-2'>{state.errorPassword}</p> : null
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <Input onChange={(e) => dispatch(changeConfirm(e.target.value))} placeholder='Confirm Password' className='border-top-0 border-start-0 border-end-0 border-bottom text-center forgot-input' value={state.newConfirmPassword} type="text" style={{ paddingTop: "0.7em", paddingBottom: "0.7em"}} invalid={state.errorConfirmPassword} />
                                        {
                                            state.errorConfirm ? <p className='font-weight-light text-danger pt-2'>{state.errorConfirm}</p> : null
                                        }
                                    </FormGroup> 
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <p className="d-flex justify-content-center" style={{ cursor: "pointer", paddingTop: "15px" }} onClick={() => dispatch(back())}>
                                                    Back
                                                </p>
                                            </Col>
                                            <Col>
                                            <Button
                                                onClick={() => dispatch(submitPassword({ email: state.email, password: state.newPassword, confirm: state.newConfirmPassword }))}
                                                color="secondary"
                                                className="me-2 mt-2 w-100"
                                                disabled={state.isSubmited}
                                            >
                                                Send
                                            </Button>
                                            </Col>
                                        </Row>
                                    </FormGroup> 
                            </>
                            ) : null
                        }    
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ForgotPassword;