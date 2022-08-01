import React, { useEffect } from 'react';
import {
    Card,
    Row,
    Col,
    Button,
    Spinner,
    Container,
} from 'reactstrap';
import {
    Card as CardBoot,
} from 'react-bootstrap';
import {
    Eye
} from 'react-feather';
import { useSelector, useDispatch } from 'react-redux'
import CheckInOutModal from '../../../ui/modals/CheckInOut';
import { changeModalOpen, changeModalClose, changeReason, initialState, changeSelect, submit } from './actions';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user, isAuthenticated } = useSelector(state => state.global);
    const state = useSelector(state => state.HomeReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) dispatch(initialState());
    }, [])

    if (state.taskList.length < 1) {
        return (
            <Container className="vh-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Spinner color="primary" />
                </Row>
            </Container>
        )
    } else {
        return (
            <>
                <div className='text-center pb-5 pt-3 border border-radius-2' style={{ backgroundColor: "blue", color: "white" }}>
                    <h1 className="display-3">Hi, Selamat Datang</h1>
                    <p className="lead">Ini adalah absensi star connect 2.0, jangan lupa bekerja keras.</p>
                    <hr className="my-2" />
                    <p>Jaga kesehatanmu ya</p>
                    <h2>{user.fullname ? user.fullname : ''}</h2>
                </div>
                <Container>
                    <Row className='justify-content-between my-5'>
                        <Col sm={4}>
                            <Card >
                                <Row className='justify-content-between'>
                                    <Col className='px-4 py-2 align-self-center'>
                                        <p>Check In</p>
                                        <p>Proses absensi kehadiran untuk mulai bekerja</p>
                                    </Col>
                                    <Button className='py-1' style={{ width: "7em" }} onClick={() => dispatch(changeModalOpen({ title: "Check In" }))}>
                                        <Eye className='mx-2 my-3 ' size={20} />
                                        <p>Check In</p>
                                    </Button>
                                </Row>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card >
                                <Row className='justify-content-between'>
                                    <Col className='px-4 py-2 align-self-center'>
                                        <p>Check Out</p>
                                        <p>Proses absensi kehadiran untuk selesai bekerja</p>
                                    </Col>
                                    <Button className='py-1' style={{ width: "7em" }} onClick={() => dispatch(changeModalOpen({ title: "Check Out" }))}>
                                        <Eye className='mx-2 my-3' size={20} />
                                        <p>Check Out</p>
                                    </Button>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <div>
                        <Row className='justify-content-between'>
                            <Col>
                                <h4 className='pb-4'>Absensi History</h4>
                            </Col>
                            {
                                state.totalItems > 4 ? <Col><p style={{textAlign: 'right', cursor: "pointer"}} onClick={() => navigate('/users/history')}>View More</p></Col> : null
                            }
                        </Row>

                        <Row sm={2} md={3} lg={4}>
                            {
                                state.userTasks.length > 0 && state.userTasks.map((task) => {
                                    let date = new Date(task.created_date);
                                    let stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                    let stringTime = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`

                                    return (
                                        <Col key={task.id}>
                                            <CardBoot>
                                                <CardBoot.Header>{task.type === 'check_in' ? "check in".toUpperCase() : "check out".toUpperCase()}</CardBoot.Header>
                                                <CardBoot.Body>
                                                    <CardBoot.Subtitle>{task.penugasan.deskripsi}</CardBoot.Subtitle>
                                                    <CardBoot.Text className='m-0 pt-4'>
                                                        <Row className='mb-2'>
                                                            <Col sm={4}>
                                                                Alasan: 
                                                            </Col>
                                                            <Col>
                                                                {task.alasan}
                                                            </Col>
                                                        </Row>
                                                    </CardBoot.Text>
                                                    <CardBoot.Text className='m-0'>
                                                        <Row className='mb-2'>
                                                            <Col sm={4}>
                                                                Tanggal:
                                                            </Col>
                                                            <Col>
                                                                {stringDate}
                                                            </Col>
                                                        </Row>
                                                    </CardBoot.Text>
                                                    <CardBoot.Text className='m-0'>
                                                        <Row>
                                                            <Col sm={4}>
                                                                Jam:
                                                            </Col>
                                                            <Col>
                                                                {stringTime}
                                                            </Col>
                                                        </Row>
                                                    </CardBoot.Text>
                                                </CardBoot.Body>
                                            </CardBoot>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>

                    <CheckInOutModal
                        modalOpen={state.modalOpen}
                        headerTitle={state.modalTitle}
                        submitProgress={state.submitProgress}
                        valueReason={state.reason}
                        optionList={state.taskList}
                        onChangeSelect={(e) => { dispatch(changeSelect(e.target.value)) }}
                        onChangeReason={(e) => { dispatch(changeReason(e.target.value)) }}
                        errorMessageSelect={state.errorMessageSelect}
                        errorMessageReason={state.errorReason}
                        onSubmit={() => dispatch(submit({ type: state.modalTitle, reason: state.reason, task: state.task }))}
                        onCancel={() => dispatch(changeModalClose())}
                    />
                </Container >
            </>
        )
    }
}

export default Home;