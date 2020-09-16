import React from "react";
import { Button } from "shards-react";
import './Button.css'
const CreateButton=(props)=>{
    return(
        <Button outline pill theme={props.style} onClick={props.clicked}>
            {props.title}
        </Button>
    );

}
export default CreateButton;