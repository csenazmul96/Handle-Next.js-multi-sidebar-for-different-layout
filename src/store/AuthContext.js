import {createContext, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";

const AuthContext  = createContext({
    permissions: [],
    setPermissions: ()=>{},
    checkPermission: ()=>{},
    getAllPermissions: ()=>{},
})

export function AuthContextProvider (props){
    const [permissions, updatePermissions] = useState([]);

    const setPermissions = (payload) =>{
        updatePermissions(payload)
    }

    const checkPermission = (payload) =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: session } = useSession();
        const permissions = session.roles || [];
        return  permissions.includes(payload);
    }

    const getAllPermissions = () =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: session } = useSession();
        return  session.roles || [];
    }

    const contexts = {
        permissions,
        setPermissions,
        checkPermission,
        getAllPermissions,
    }

    return (
        <AuthContext.Provider value={contexts}>
            {props.children}
        </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);
