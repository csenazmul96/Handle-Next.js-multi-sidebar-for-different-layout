import { createContext, useContext, useState } from 'react';

const CurriculumContext = createContext({
    openForm: false,
    isSidebarOpen: false,
    currentGroup: null,
    currentChapter: null,
    activeContent: '',
    chapterGroup: [],
    sidebarSettings: {
        heading : "default",
        toggleBtn : false,
        arrow : "",
        customStyle : false
    },
    setIsSidebarOpen: ()=>{},
    setSidebarSettings: ()=>{},
    setCurrentGroup: ()=>{},
    setChapterGroup: ()=>{},
    setActiveContent: ()=>{},
    setCurrentChapter: ()=>{},

});

export const CurriculumProvider = ({ children }) => {
    const [openForm, setOpenForm] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState({first: '', second: '', third: ''});
    const [sidebarSettings, setSidebarSettings] = useState({
        heading : "default",
        toggleBtn : false,
        arrow : "",
        customStyle : false
    });
    const [currentGroup, setCurrentGroup] = useState(null);
    const [chapterGroup, setChapterGroup] = useState([]);

    const toggleCurriculumSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const contexts = {
        openForm,
        setOpenForm,
        currentGroup,
        chapterGroup,
        sidebarSettings,
        activeDropdown,
        setActiveDropdown,
        isSidebarOpen,
        setIsSidebarOpen,
        setCurrentGroup,
        setChapterGroup,
        actionType,
        currentChapter,
        setCurrentChapter,
        setActionType,
        toggleCurriculumSidebar,
        setSidebarSettings

    }

    return (
        <CurriculumContext.Provider value={contexts}>
            {children}
        </CurriculumContext.Provider>
    );
};

export const useCurriculumContext = () => useContext(CurriculumContext);