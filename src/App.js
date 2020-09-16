import React, { Component } from 'react';
import CreateButton from "./Components/Ui/Button/Button";
import './App.css';
import CreateModal from "./Components/Ui/Modal/Modal";
import CreateInput from "./Components/Ui/Input/Input";
import {changedValueHandler, editHandlerOpened} from './shared/multiplyFunction'

import Notes from "./Components/Ui/Notes/Notes";
import {searching} from "./shared/utility";

class App extends Component {
    state={
        edit: false,
        create: false,
        config:{
            date: {
                elementType: 'date',
                elementConfig: {
                    type: 'date',
                    placeholder: ''
                },
                value: '',
                label: "Date",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                label: "Title",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            notes: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                value: '',
                label: "Note",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'books',
                        displayValue: 'Books'
                    }, {
                        value:'business' ,
                        displayValue: 'Business'
                    },
                        {
                            value: 'catalogs',
                            displayValue: 'Catalogs'
                        },
                        {
                            value: 'education',
                            displayValue: 'Education'
                        },
                        {
                            value: 'entertainment',
                            displayValue: 'Entertainment'
                        },
                        {
                            value: 'finance',
                            displayValue: 'Finance'
                        },
                        {
                            value: 'foodDrink',
                            displayValue: 'Food & Drink'
                        },
                        {
                            value: 'games',
                            displayValue: 'Games'
                        },
                    ]
                },
                value: '',
                label: "Category",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        searchConfig:{
            categorySearch: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: '',
                            displayValue: ''
                        },
                        {
                        value: 'books',
                        displayValue: 'Books'
                    }, {
                        value:'business' ,
                        displayValue: 'Business'
                    },
                        {
                            value: 'catalogs',
                            displayValue: 'Catalogs'
                        },
                        {
                            value: 'education',
                            displayValue: 'Education'
                        },
                        {
                            value: 'entertainment',
                            displayValue: 'Entertainment'
                        },
                        {
                            value: 'finance',
                            displayValue: 'Finance'
                        },
                        {
                            value: 'foodDrink',
                            displayValue: 'Food & Drink'
                        },
                        {
                            value: 'games',
                            displayValue: 'Games'
                        },
                    ]
                },
                value: '',
                label: "Category",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            dateSearch: {
                elementType: 'date',
                elementConfig: {
                    type: 'date',
                    placeholder: ''
                },
                value: '',
                label: "Date",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },

        },
        notes: [
            {id:2,
                title: 'Lorem Ipsum',
                notes: 'Lorem Ipsum is simply dummy text of the printin',
                date:"2014-09-13",
                category: 'books',
                collapseToggle: false},
                {id:4,
                    title: 'Why do we use it?',
                    notes: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ip',
                    date:"2020-09-13",
                    category: 'games',
                    collapseToggle: false}],
        editId: null,
        defaultNotes:[ {id:2,
            title: 'Lorem Ipsum',
            notes: 'Lorem Ipsum is simply dummy text of the printin',
            date:"2014-09-13",
            category: 'books',
            collapseToggle: false},
            {id:4,
                title: 'Why do we use it?',
                notes: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ip',
                date:"2020-09-13",
                category: 'games',
                collapseToggle: false}  ],
    }
    emptyCongif=()=>{
        let config=this.state.config
        for(let key in config){
            config[key].value=''
        }
        this.setState({config:config })
    }
    createNotes=()=>{
        this.modalToggle('create')
    }
    changedNotes=(event,id)=>{
        const updateControl=changedValueHandler(this.state.config, id, event)
        this.setState({config: updateControl});
    }
    modalToggle=(type)=>{
        let create=false;
        let edit=false;
        if(type==='edit'){
            edit=true;
        }else if(type==='create'){
            this.emptyCongif();
            create=true;
        }else{
            this.emptyCongif();
            create=false;
            edit=false;
        }
        this.setState({create: create, edit: edit,  open: !this.state.open})
    }
    //at first
    openCollapse=(id, togglevalue)=>{
        let newList=this.state.notes;
        for(let key in newList){
            if(newList[key].id===id){
                newList[key].collapseToggle=!togglevalue;
            }
        }

        this.setState({notes: newList})
    }
    editNotes=(id)=>{
        const editFormOpen=editHandlerOpened(this.state.notes, this.state.config, id);

        this.modalToggle('edit')

        this.setState({config: editFormOpen, editId: id})
    }
    searchNotes=(event, id)=>{
        const updateControl=changedValueHandler(this.state.searchConfig, id, event)
        this.setState({searchConfig: updateControl});
    }
    saveNote=()=>{
        let newList=this.state.notes;
        let id=this.state.editId;
        let config=this.state.config;
        for(let key in newList){
            if(newList[key].id==id){
                let elem=newList[key]
                for(let val in config){
                    elem[val]=config[val].value;
                }
            }
        }
        this.modalToggle();
        this.setState({notes: newList, defaultNotes: newList})
        this.emptyCongif();
    }
    addNotes=()=>{
        const min = 1;
        const max = 100;
        const rand =  min + (Math.random() * (max-min));
        const notes={id:'', title: '', notes: '', date: '', category: '', collapseToggle: false}
        const notesList=this.state.notes;
        for (let key in this.state.config) {
            notes.id = rand;
            notes[key] = this.state.config[key].value
        }
        notesList.push(notes);

        this.setState({notes: notesList, defaultNotes:  notesList })
        this.createNotes();
        this.emptyCongif();
    }
    deleteNotes=(id)=>{

        let newList=this.state.notes;
        for(let key in newList){
            if(newList[key].id===id){
                delete newList[key];
            }
        }
        this.setState({notes: newList, defaultNotes:  newList})
    }
    search=()=>{

        let category=this.state.searchConfig.categorySearch.value;
        let date=this.state.searchConfig.dateSearch.value;
        let search;
        if (date && category){
            search = searching({date:date, category: category}, this.state.defaultNotes)
        }else if(category !== ''){
            let by='category'
              search =searching(category, this.state.defaultNotes, by)
        }else if(date){
            let by='date'
              search = searching(date, this.state.defaultNotes, by)
        }

        this.setState({notes: search})

    }
    reset=()=>{
        let reset= this.state.searchConfig;
        reset.dateSearch.value="";
        this.setState({searchConfig: reset})

    }
    sort=(by)=>{
        let obj=this.state.defaultNotes;
        obj.sort(function (a, b) {
                let nameA;
                let nameB;
                if(!a[by] || !b[by]){
                    console.log('err empty')
                }else{
                    nameA = a[by].toUpperCase();
                    nameB = b[by].toUpperCase();
                }

                if (nameA < nameB) {
                    return 1;
                }else if (nameA > nameB) {
                    return -1;
                }




            return 0;
        });
        this.setState({notes: obj})
    }
    render() {
        let formElementsArray=[];
        for(let key in this.state.config){
            formElementsArray.push({id: key, config: this.state.config[key]});
        }

        let inputs = formElementsArray.map((formElement,index)=>(
                <CreateInput
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    labelInd={index}
                    changed={(event)=>this.changedNotes(event,formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                />

            )
        );
        let button=null;
        if(this.state.create) {
               button = <CreateButton style="success" title="Add" clicked={this.addNotes}/>
        }else if(this.state.edit){
            button = <CreateButton style="warning" title="Save" clicked={()=>this.saveNote(this.state.notes)}/>
        }else{
            button=null;
        }
        let form=(
            <form>
                {inputs}
                {button}
                <CreateButton  style="success" title="Cancel" clicked={this.modalToggle}/>

            </form>
        )


//form
        let arrNotes=[];
        let showNotes;
        for (let key in this.state.notes) {
            showNotes =  <Notes key={this.state.notes[key].id}
                                title={this.state.notes[key].title}
                                date={this.state.notes[key].date}
                                category={this.state.notes[key].category}
                                notes={this.state.notes[key].notes}
                                collapse={this.state.notes[key].collapseToggle}
                                clicked={(event)=>this.openCollapse(this.state.notes[key].id,this.state.notes[key].collapseToggle)}
                                deleteClicked={(event)=>this.deleteNotes(this.state.notes[key].id)}
                                editClicked={(event)=>this.editNotes(this.state.notes[key].id)}
            />
            arrNotes.push(showNotes);
        }
//search
        let formElementsArraySearch=[];
        for(let val in this.state.searchConfig){

            formElementsArraySearch.push({id: val, searchConfig: this.state.searchConfig[val]});

        }

        let inputSearch = formElementsArraySearch.map((formElement,index)=>(
                <CreateInput
                    key={formElement.searchConfig.id}
                    elementType={formElement.searchConfig.elementType}
                    elementConfig={formElement.searchConfig.elementConfig}
                    value={formElement.searchConfig.value}
                    label={formElement.searchConfig.label}
                    labelInd={index}
                    changed={(event)=>this.searchNotes(event,formElement.id)}
                    invalid={!formElement.searchConfig.valid}
                    shouldValidate={formElement.searchConfig.validation}
                    touched={formElement.searchConfig.touched}
                />


            )
        );


        let dateSort=(<h5 onClick={()=>this.sort('date')}> Date    &#10148;</h5>);
        let categorySort=(<h5 onClick={()=>this.sort('category')}> Category   &#10148; </h5>);
        let notes=(<h5> Notes </h5>);
        let title=(<h5> Title  </h5>);

        return (

            <div>
                <CreateButton  style="success" title="Create Note" clicked={()=>this.createNotes('create')}/>
                   <div className="Search">

                           {inputSearch}
                           <CreateButton   style='success' title="Search" clicked={()=>this.search()}/>

                           <CreateButton clasName="Left"  style='success' title="Reset" clicked={()=>this.reset()}/>
                   </div>
                <CreateModal
                    open={this.state.open}
                    toggle={this.createNotes}
                    header="Create Note" body={form}/>

                    <div style={{float: "left", marginLeft: '20%', width: '50%', marginTop: '10%'}}>
                        <Notes
                            title={title}
                            date={dateSort}
                            category={categorySort}
                            notes={notes}
                            header={true}

                        />
                        {arrNotes}
                    </div>



            </div>

        );
    }
}
export default App