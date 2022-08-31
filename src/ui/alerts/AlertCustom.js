import { Alert } from "reactstrap"

const CustomAlert = ({message, title, toggle, open}) => {
    return (
        <Alert color="success" toggle={toggle} isOpen={open} >
            <p className="mb-0">
                {message}
            </p>
            {/* <p className="mb-0">
                {message}
            </p> */}
        </Alert>
    )
}

export default CustomAlert;