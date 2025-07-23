import {createContext, useEffect, useState} from "react";

const OrganizationContext  = createContext({
    currentOrganization: null,
    commonSelectedOrganization: null,
    isNewGroupAdded: null,
    allOrganizations: [],
    setAllOrganizations: ()=>{},
    setIsNewGroupAdded: ()=>{},
    setCurrentOrganization: ()=>{},
    setCommonSelectedOrganization: ()=>{},
})

export function OrganizationContextProvider (props){
    const [currentOrganization, selectCurrentOrganization] = useState(null);
    const [commonSelectedOrganization, updateCommonSelectedOrganization] = useState(null);
    const [isNewGroupAdded, updateIsNewGroupAdded] = useState(null);
    const [allOrganizations, updateSllOrganizations] = useState([]);

    const setCurrentOrganization = (payload) =>{
        selectCurrentOrganization(payload)
    }
    const setCommonSelectedOrganization = (payload) =>{
        updateCommonSelectedOrganization(payload)
    }
    const setAllOrganizations = (payload) =>{
        updateSllOrganizations(payload)
    }
    const setIsNewGroupAdded = (payload) =>{
        updateIsNewGroupAdded(payload)
    }

    const contexts = {
        currentOrganization,
        allOrganizations,
        isNewGroupAdded,
        commonSelectedOrganization,
        setCurrentOrganization,
        setIsNewGroupAdded,
        setAllOrganizations,
        setCommonSelectedOrganization
    }

    return (
        <OrganizationContext.Provider value={contexts}>
            {props.children}
        </OrganizationContext.Provider>
    );
}

export default OrganizationContext;