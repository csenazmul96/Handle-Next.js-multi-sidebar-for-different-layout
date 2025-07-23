import { createContext, useContext, useState } from 'react';

const DataTableContext = createContext();

export const DataTableProvider = ({ children }) => {
    const [selectedRow, setSelectedRows] = useState([])

    const contexts = {
        selectedRow,
        setSelectedRows
    }
    return (
        <DataTableContext.Provider value={contexts}>
            {children}
        </DataTableContext.Provider>
    );
};

export const useDataTable = () => useContext(DataTableContext);