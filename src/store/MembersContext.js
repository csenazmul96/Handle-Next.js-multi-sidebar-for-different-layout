import { createContext, useContext, useState } from 'react';

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
    const [memberList, setMemberList] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const contexts = {
        memberList,
        selectedMembers,
        setMemberList,
        setSelectedMembers
    }
    return (
        <MemberContext.Provider value={contexts}>
            {children}
        </MemberContext.Provider>
    );
};

export const useMember = () => useContext(MemberContext);