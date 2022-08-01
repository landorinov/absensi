import { FormGroup, Input, Label } from "reactstrap"


function GeneralField({title, errorMessage, type, value, onChange}) {
    return (
        <FormGroup>
            <Label>{title}</Label>
            <Input value={value} type={type} invalid={errorMessage} className={errorMessage ? "border border-danger" : "border border-1 border-secondary"} style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} onChange={onChange} />
            {
                errorMessage ? <p className='font-weight-light text-danger pt-2'>{errorMessage}</p> : null
            }
        </FormGroup>
    )
}

export default GeneralField;