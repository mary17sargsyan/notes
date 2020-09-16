import React from "react";

import {Collapse, Container,Col,Row} from "shards-react";
import CreateButton from "../Button/Button";
import './Notes.css'
const Notes =(props)=>{
    let nots=null;
    if(props.header){
        nots=<h5> Notes</h5>
    }else{
        nots=(<CreateButton style="success" title="Note" clicked={props.clicked}/>)
    }

    return(

        <div>
            <div className="title">
                <Container className="dr-example-container">

                <Row>
                    <Col> {props.title}</Col>
                    <Col> {props.category}  </Col>

                    <Col> {nots}  </Col>
                    <Col>{props.date}</Col>
                    </Row>
            </Container>
            </div>
            <Collapse open={props.collapse}>
                <div style={{minHeight: '70px'}} className="p-3 mt-3 border rounded">
                    {props.notes}
                    <span  style={{color: '#17c671', float:'right'}} onClick={props.editClicked} className="material-icons">
edit
                    </span>
                    <span style={{color:'red',float:'right' }} onClick={props.deleteClicked} className="material-icons">
delete
</span>

                </div>
            </Collapse>
        </div>
    );
}
export default Notes