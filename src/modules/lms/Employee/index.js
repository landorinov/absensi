import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Row, Table, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, CardFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { initialState, submit, nextPrev } from './actions';

function Employee(args) {
    const { isAuthenticated } = useSelector(state => state.global);
    const state = useSelector(state => state.AbsenceReducer);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(state.modalOpen);
    const toggle = () => setModal(!modal);

    const [modalDetail, setModalDetail] = useState(false);
    const toggleDetail = () => setModalDetail(!modalDetail);

    const [reason, setReason] = useState('');
    const [task, setTask] = useState(0);
    const [statusAbsence, setStatus] = useState('');

    const pages = Array.apply(null, { length: state.totalPage }).map(Number.call, Number);
    const [selectedPage, setPage] = useState(0)

    const [selectedDetail, setDetail] = useState('')

    function nextPrevPagination(page) {
        dispatch(nextPrev(page))
    }

    function dateFormat(dates) {
        let date = new Date(dates);
        let stringDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        let stringTime = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
        return "Tanngal " + stringDate + ", Pukul " + stringTime
    }

    useEffect(() => {
        if (isAuthenticated) dispatch(initialState());
        console.log('state', state);
    }, []);

    if (state.listAbsensi && state.listAbsensi.length < 1) {
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
                <Row>
                    <Col sm={12}>
                        <Card
                            className="my-2"
                            color="light"
                        >
                            <CardHeader>
                                List Employee, Total Data <b>{state.totalItems}</b>
                                <Button color="success" style={{ float: 'right' }} onClick={toggle}>
                                    + Add Data
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    borderless
                                    responsive
                                    size=""
                                    striped
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Penugasan
                                            </th>
                                            <th>
                                                Absensi
                                            </th>
                                            <th>
                                                Tipe
                                            </th>
                                            <th>
                                                Alasan
                                            </th>
                                            <th>
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.listAbsensi?.map((item, index) => {
                                            let date = new Date(item.created_date);
                                            let stringDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                                            let stringTime = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`

                                            return (
                                                <tr key={item.id}>
                                                    <th scope="row">
                                                        {(index + 1) + (10 * selectedPage)}
                                                    </th>
                                                    <td>
                                                        {item.penugasan.deskripsi}
                                                    </td>
                                                    <td>
                                                        Tanggal {stringDate}, Pukul {stringTime}
                                                    </td>
                                                    <td>
                                                        {item.type}
                                                    </td>
                                                    <td>
                                                        {item.alasan}
                                                    </td>
                                                    <td>
                                                        <Button color="warning">
                                                            Edit
                                                        </Button>
                                                        {' '}
                                                        <Button color="danger">
                                                            Delete
                                                        </Button>
                                                        {' '}
                                                        <Button color="info" onClick={() => (setDetail(item), toggleDetail())}>
                                                            Detail
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Pagination style={{ float: 'right' }}>
                                    {/* <PaginationItem>
                                        <PaginationLink
                                            first
                                            href="#"
                                        >
                                            First
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            previous
                                        >
                                            Previous
                                        </PaginationLink>
                                    </PaginationItem> */}
                                    {(pages).map(page => {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink onClick={() => (nextPrevPagination(page), setPage(page))}>
                                                    {(page + 1)}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    })}
                                    {/* <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            next
                                        >
                                            Next
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            last
                                        >
                                            Last
                                        </PaginationLink>
                                    </PaginationItem> */}
                                </Pagination>
                            </CardFooter>
                        </Card>

                    </Col>

                </Row>

                <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle}>Add Data</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleSelect">
                                Select
                            </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => { setStatus(e.target.value) }}
                            >
                                <option>
                                    Pilih Status
                                </option>
                                <option value={'Check In'}>
                                    Check In
                                </option>
                                <option value={'Check Out'}>
                                    Check Out
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="penugasanLabel">
                                Pilih Penugasan
                            </Label>
                            <Input
                                id="penugasanInput"
                                name="select"
                                type="select"
                                onChange={(e) => { setTask(e.target.value) }}
                            >
                                {state.taskList && state.taskList.map(optionData => {
                                    return (
                                        <option key={optionData.label} value={optionData.value}>
                                            {optionData.label}
                                        </option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reasonLabel">
                                Reason
                            </Label>
                            <Input
                                id="reasonInput"
                                name="textarea"
                                type="textarea"
                                onChange={(e) => { setReason(e.target.value) }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>
                            Close
                        </Button>
                        {' '}
                        <Button color="primary" onClick={() => { toggle(); dispatch(submit({ type: statusAbsence, reason: reason, task: task })) }}>
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>

                {modalDetail ?
                    <Modal isOpen={modalDetail} toggle={toggleDetail} {...args}>
                        <ModalHeader toggle={toggleDetail}>Detail Data</ModalHeader>
                        <ModalBody>
                            <Row className='py-2'>
                                <Col lg="4">Tipe</Col>
                                <Col lg="8">{selectedDetail.type}</Col>
                            </Row>
                            <Row className='py-2'>
                                <Col lg="4">Penugasan</Col>
                                <Col lg="8">{selectedDetail.penugasan.deskripsi}</Col>
                            </Row>
                            <Row className='py-2'>
                                <Col lg="4">Absensi</Col>
                                <Col lg="8">{dateFormat(selectedDetail.created_date)}</Col>
                            </Row>
                            <Row className='py-2'>
                                <Col lg="4">Alasan</Col>
                                <Col lg="8">{selectedDetail.alasan}</Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleDetail}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                    : ''}
            </Container >
        )
    }
}

export default Employee;