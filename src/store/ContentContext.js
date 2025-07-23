import { createContext, useContext, useState } from "react";

const ContentContext = createContext({
  openForm: false,
  activeContent: "",
  chapterGroup: [],
  currentGroup: null,
  actionType: "create",
  activeDropdown: { first: "", second: "", third: "" },
  setOpenForm: () => {},
  setActionType: () => {},
  setCurrentGroup: () => {},
  setChapterGroup: () => {},
  setActiveContent: () => {},
});

export const ContentProvider = ({ children }) => {
  const [openForm, setOpenForm] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [activeDropdown, setActiveDropdown] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [currentGroup, setCurrentGroup] = useState(null);
  const [chapterGroup, setChapterGroup] = useState([]);
  const [activeContent, setActiveContent] = useState("");

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
    setActiveDropdown,
  };

  return (
    <ContentContext.Provider value={contexts}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => useContext(ContentContext);
