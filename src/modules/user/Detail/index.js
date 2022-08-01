import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import asset from '../../../assets/images/users/user5.jpg';

function UserDetail() {
    const { user, isAuthenticated } = useSelector(state => state.global);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/auths/login');
    }, [])

    if (!user) {
        return (
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Spinner color="primary" />
                </Row>
            </Container>
        )
    } else {
        return (
            <Container className='pt-4'>
                <Row className="justify-content-center text-center mb-5">
                    <Col>
                    {
                        user.profile_pic ? <img src={user} alt="profile" className="rounded-circle" width="15%" /> : <img src={asset} alt="profile" className="rounded-circle" width="15%" />
                    }
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center h-100 text-center">
                    <Col md="10">
                        <h2 className='text-center'>Information Data</h2>
                        <Card className='mt-4'>
                            <CardBody className="p-4 m-1">
                                <Row className='mb-5'>
                                    <Col>
                                        <p>Full Name</p>
                                        <h4>{user.fullname}</h4>
                                    </Col>
                                    <Col>
                                        <p>Gender</p>
                                        <h4>{user.gender}</h4>
                                    </Col>
                                </Row>
                                <Row className='mb-5'>
                                    <Col>
                                        <p>Email</p>
                                        <h4>{user.username}</h4>
                                    </Col>
                                    <Col>
                                        <p>Phone Number</p>
                                        <h4>{user.phone_number}</h4>
                                    </Col>
                                </Row>
                                <Row className='mb-5'>
                                    <Col>
                                        <p>Location</p>
                                        <h4>{user.region}</h4>
                                    </Col>
                                    <Col>
                                        <p>Passion</p>
                                        <h4>{user.passion}</h4>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserDetail;