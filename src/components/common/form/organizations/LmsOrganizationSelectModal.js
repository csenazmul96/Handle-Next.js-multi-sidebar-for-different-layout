"use client";
import { GoCheck } from "react-icons/go";
import React, {useEffect, useState} from "react";
import LmsOrganizationGroupList from "@/components/common/form/organizations/LmsOrganizationGroupList";
import {Dialog, DialogActions, DialogBody, DialogTitle} from "@/components/common/dialog";
import {Button} from "@/components/common/button";

const LmsOrganizationSelectModal = ({isOpen = true,
                                        setIsOpen,
                                        organizations=[],
                                        onSelectCallback,
                                        selectedOrganizationId = '',
                                        singleElement = false,
                                        selectedOrgGroup= null}) => {
    const [activeMenu, setActiveMenu] = useState([]);

    const [selectedId, setSelectedId] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
      setSelectedId(selectedOrganizationId);
    }, [selectedOrganizationId, isOpen]);

    useEffect(() => {
      if (selectedOrgGroup){
        setSelectedGroup(selectedOrgGroup);
      }
    }, [selectedOrgGroup]);

    const handleClick = (item)=>{
        setActiveMenu((prevList) => {
            if (prevList.includes(item)) {
                return prevList.filter((i) => i !== item);
            } else {
                return [...prevList, item];
            }
        });
    }

    const selectHandler = () => {
        onSelectCallback(selectedGroup);
        setIsOpen(false);
    };

    const changeSelectedGroup = (item) => {
        if (item){
            setSelectedGroup(item)
            setSelectedId(item.id)
        }
    }

    return (
        <Dialog open={isOpen} onClose={setIsOpen}>
            <DialogTitle>Organizations/ {selectedGroup?.name}</DialogTitle>
            <DialogBody>
                <ul>
                    {organizations && organizations.map((item, index) => (
                        <LmsOrganizationGroupList key={index}
                                                  menu={item}
                                                  index={`parent-${index}`}
                                                  level={'first-level'}
                                                  stage={1}
                                                  selectedId={selectedId}
                                                  setSelectedGroup={changeSelectedGroup}
                                                  setActiveMenu={handleClick}
                                                  parentSlug={item.id}
                                                  activeMenu={activeMenu}
                        />
                    ))}
                </ul>
            </DialogBody>
            <DialogActions>
                <Button
                    type="button"
                    color="transparentSmall"
                    onClick={() => setIsOpen(false)}> Cancel </Button>

                <Button
                    type="button"
                    color="primarySmall"
                    onClick={selectHandler}> <GoCheck /> Select</Button>

            </DialogActions>
        </Dialog>
    );
}

export default LmsOrganizationSelectModal;