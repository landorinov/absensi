import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Container, Row } from 'reactstrap';
import { initialState } from './actions';

function History() {
    const { isAuthenticated } = useSelector(state => state.global);
    const state = useSelector(state => state.HistoryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) dispatch(initialState());
    }, []);

    if (state.userTasks && state.userTasks.length < 1) {
        return (
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center text-center h-100">
                    <h4>
                        No Data
                    </h4>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container>
                <Row sm={2} md={3} lg={4}>
                    {
                        state.userTasks.length > 0 && state.userTasks.map((task) => {
                            let date = new Date(task.created_date);
                            let stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                            let stringTime = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`

                            return (
                                <Col key={task.id}>
                                    <Card>
                                        <Card.Header>{task.type === 'check_in' ? "check in".toUpperCase() : "check out".toUpperCase()}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle>{task.penugasan.deskripsi}</Card.Subtitle>
                                            <Card.Text className='m-0 pt-4'>
                                                <Row className='mb-2'>
                                                    <Col sm={4}>
                                                        Alasan:
                                                    </Col>
                                                    <Col>
                                                        {task.alasan}
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            <Card.Text className='m-0'>
                                                <Row className='mb-2'>
                                                    <Col sm={4}>
                                                        Tanggal:
                                                    </Col>
                                                    <Col>
                                                        {stringDate}
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            <Card.Text className='m-0'>
                                                <Row>
                                                    <Col sm={4}>
                                                        Jam:
                                                    </Col>
                                                    <Col>
                                                        {stringTime}
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}

export default History;