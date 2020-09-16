import {checkValidity, updateObject} from "./utility";

export  const changedValueHandler = (controls,id, event)=>{

    const updateControl = updateObject(controls, {
        ...controls,
        [id]: updateObject(controls[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[id].validation),
            touched: true
        })
    });

    return updateControl;
}







export const editHandlerOpened=(notes, controlsState, id)=>{

    const editNotes=notes;
    let editNote={};
    const controls=controlsState;
    for(let key in editNotes) {
        if (editNotes[key].id === id) {
            editNote=editNotes[key];
        }
    }
    for(let key  in controls ){
            controls[key].value=editNote[key];
    }
    return controls;

}
