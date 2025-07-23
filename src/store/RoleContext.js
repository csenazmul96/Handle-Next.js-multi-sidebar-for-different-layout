import {createContext, useEffect, useState} from "react";

const RoleContext  = createContext({
    editRole: null,
    setEditRole: ()=>{},
    newForm: true
})

export function RoleContextProvider (props){
    const [editRole, updateEditRole] = useState(null);
    const [newForm, updateNewForm] = useState(true);

    const setEditRole = (payload) =>{
        updateEditRole(payload)
    }
    const setNewForm = (payload) =>{
        updateNewForm(payload)
    }

    const contexts = {
        editRole,
        newForm,
        setEditRole,
        setNewForm
    }

    return (
        <RoleContext.Provider value={contexts}>
            {props.children}
        </RoleContext.Provider>
    );
}

export default RoleContext;