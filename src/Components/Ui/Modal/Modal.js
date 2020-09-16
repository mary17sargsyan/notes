import React from "react";
import "./Modal.css"
import {Modal, ModalHeader, ModalBody} from "shards-react";

const CreateModal =(props)=>{
    return(<Modal open={props.open} toggle={props.toggle}>
        <ModalHeader>{props.header} </ModalHeader>
        <ModalBody>{props.body}</ModalBody>
    </Modal>)

}
export default CreateModal;