"use client"
import React from "react";
import {Checkbox} from "@/components/common/checkbox";

const LmsTableCommonCheckbox = ({id = null, rows = [], setSelectedRows, selectedRow}) => {

    const clickHandler = () => {
        if (id === 'all'){
            if (rows.length === selectedRow.length){
                setSelectedRows([])
            }  else {
                setSelectedRows(rows.map(item => item.id ))
            }
        } else {
            const findIndex = selectedRow.find(item => item === id)
            if (findIndex !== undefined){
                setSelectedRows(selectedRow.filter(item => item !== id))
            } else {
                setSelectedRows((prev) => ([...prev, id]))
            }
        }
    }

    const onClickHandler = (event) => {
        event.stopPropagation();
    }

    const getCheckedStatus = () => {

        let status = false
        if (id === 'all'){
            status = rows.length && rows.length === selectedRow.length ? true : false
        } else {
            status = selectedRow.includes(id) ? true : false
        }
        return status
    }

    return(
        <Checkbox color="lmscheckbox"
                  className={'pl-2'}
                  name="discoverability"
                  checked={getCheckedStatus()}
                  onClickHandler={onClickHandler}
                  clickHandler={clickHandler}
                  value="default"/>
    );
}

export default LmsTableCommonCheckbox