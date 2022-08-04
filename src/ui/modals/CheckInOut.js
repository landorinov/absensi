import {
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Spinner,
} from 'reactstrap';
import GeneralField from '../fields/GeneralField';
import SelectField from '../fields/SelectField';

const CheckInOutModal = ({ submitProgress, modalOpen, optionList, valueReason, valueSelect, onChangeReason, onChangeSelect, errorMessageReason, errorMessageSelect, headerTitle, onSubmit, onCancel }) => {

    return (
        <Modal isOpen={modalOpen} centered>
            {
                submitProgress ? 
                <ModalBody className='text-center'>
                    <Spinner />
                    <h5 className='pt-4'>Processing...</h5>
                </ModalBody> : null
            }
            {
                !submitProgress ? 
                <>
                    <ModalHeader className="text-center">{headerTitle}</ModalHeader>
                    <ModalBody>
                        <SelectField title="Penugasan" options={optionList} isMulti={false} onChange={onChangeSelect} value={valueSelect} errorMessage={errorMessageSelect} />
                        <GeneralField type="textarea" title="Reason" value={valueReason} onChange={onChangeReason} errorMessage={errorMessageReason} />
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={submitProgress} color="primary" className='mr-3' onClick={onSubmit}>Submit</Button>
                        <Button disabled={submitProgress} color="secondary" onClick={onCancel}>Cancel</Button>
                    </ModalFooter>
                </> : null
            }
        </Modal>
    );
};

export default CheckInOutModal;