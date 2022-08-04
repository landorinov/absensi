import { Modal } from "react-bootstrap"
import { CheckCircle } from "react-feather";

const Success = ({show, title}) => {
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='text-center py-5'>
                <CheckCircle size={48} color="green" />
                <h5 className='pt-4'>
                    {title}
                </h5>
            </Modal.Body>
        </Modal>
    )
}

export default Success;