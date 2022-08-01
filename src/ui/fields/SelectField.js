import { FormGroup, Input, Label } from "reactstrap"


function SelectField({title, isMulti, errorMessage, options, onChange}) {
    return (
        <FormGroup>
            <Label>{title}</Label>
            <Input multiple={isMulti} type="select" invalid={errorMessage} className={errorMessage ? "border border-danger" : "border border-1 border-secondary"} style={{ paddingTop: "0.7em", paddingBottom: "0.7em" }} onChange={onChange}>
                {
                    options && options.map(optionData => {
                        return (
                            <option value={optionData.value}>{optionData.label}</option>
                        )
                    })
                }
            </Input>
            {
                errorMessage ? <p className='font-weight-light text-danger pt-2'>{errorMessage}</p> : null
            }
        </FormGroup>
    )
}

export default SelectField;