import { createContext, useContext, useState } from 'react';

const PageSidebarContext = createContext({
    openForm: false,
    activeContent: '',
    chapterGroup: [],
    currentGroup: null,
    actionType: 'create',
    activeDropdown: {first: '', second: '', third: ''},
    setOpenForm: ()=>{},
    setActionType: ()=>{},
    setCurrentGroup: ()=>{},
    setChapterGroup: ()=>{},
    setActiveContent: ()=>{},
    setActiveDropdown: ()=>{},
});

export const PageSidebarProvider = ({ children }) => {
    const [openForm, setOpenForm] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [activeDropdown, setActiveDropdown] = useState({first: '', second: '', third: ''});
    const [currentGroup, setCurrentGroup] = useState(null);
    const [chapterGroup, setChapterGroup] = useState([]);
    const [activeContent, setActiveContent] = useState('');

    const contexts = {
        openForm,
        activeContent,
        chapterGroup,
        activeDropdown,
        actionType,
        currentGroup,
        setOpenForm,
        setActionType,
        setCurrentGroup,
        setChapterGroup,
        setActiveContent,
        setActiveDropdown
    }

    return (
        <PageSidebarContext.Provider value={contexts}>
            {children}
        </PageSidebarContext.Provider>
    );
};

export const usePageSidebarContext = () => useContext(PageSidebarContext);