import React from "react";
import {FormInput, FormSelect} from "shards-react";
import './Input.css'
const CreateInput =(props)=>{
    let element;

    switch (props.elementType){
        case('input'):

            element =<FormInput
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value}
                />;
            break;
        case('select'):

            element=<FormSelect
                onChange={props.changed}>
                {props.elementConfig.options.map( option=>(
                        <option key={option.value} value={option.value}> {option.displayValue} </option>
                    ) )
                }
            </FormSelect>
            break;
        case('date'):

            element =<FormInput type="date" className="form-control" id="datepicker-example" onChange={props.changed}
                                {...props.elementConfig}
                                value={props.value}
            />;
            break;


    }
    return(
        <div>
        <label>
            {props.label}
        </label>{element}
        </div>

    );
}
export default CreateInput;