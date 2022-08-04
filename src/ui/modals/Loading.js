import { Modal } from "react-bootstrap"
import { Spinner } from "reactstrap"

const Loading = (show) => {
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='text-center py-5'>
                <Spinner />
                <h5 className='pt-4'>Processing...</h5>
            </Modal.Body>
        </Modal>
    )
}

export default Loading;