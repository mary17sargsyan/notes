export const updateObject = (oldObject, updatedValues)=>{
    return{
        ...oldObject,
        ...updatedValues

    };
};


export const checkValidity = (value, rules) =>{
    let isValid =true;
    if(!rules){
        return true;
    }
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength ){
        isValid = value.length >= rules.minLength  && isValid ;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength  && isValid ;
    }
    return isValid;
};

export const sorting = (by, object)=>{
    object.sort(function (a, b) {
        if(a === null || b=== null){

        }else{
            let nameA;
            let nameB;
            if(!a[by] || !b[by]){

            }else{
                nameA = a[by].toUpperCase(); // ignore upper and lowercase
                nameB = b[by].toUpperCase(); // ignore upper and lowercase
            }

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

        }


        return 0;
    });
};

export const searching = (value, object, by) =>{
    let newObj=[];
    if(value){
        if(object.length !==0){
            object.find(function(post, index) {

                if(by==='category' ){
                    if(object[index].category===value){
                        newObj.push(object[index]);
                    }
                }else if(by==='date'){
                    if(object[index].date===value){
                        newObj.push(object[index]);
                    }
                }else {
                    if(object[index].category===value.category ){
                        if( object[index].date===value.date ){
                            newObj.push(object[index]);
                        }

                    }
                }

            });
        }else{
            console.log('emptyArray')
        }


    }



    return newObj;
};
