import {Label} from "@/components/common/fieldset";
import React, { useEffect, useState} from "react";
import {Button} from "@/components/common/button";
import RoleFormPermissionSingleElement
    from "@/app/(root-layout)/(main)/members-and-message-management/membership-management/administrator-management/role-management/components/RoleFormPermissionSingleElement";
import {Checkbox, CheckboxField} from "@/components/common/checkbox";
import LmsStandardInputField from "@/components/common/form/LmsStandardInputField";
import {generateSearchResult, searchList} from "@/utils/helpers/CommonHelper";
import {RotateCw} from "lucide-react";

const LmsOrganizationMultipleSelect = ({groups:allGroups,
                                           selectedGroups,
                                           callBack= ()=> {},
                                           noBorderPadding = false,
                                           buttonLabels = {selectAllChild: "모두 선택 취소",
                                               deselectAllChild: "전체 선택",
                                               firstStep: "1차 메뉴",
                                               secondStep: "2차 메뉴",
                                               reset: "초기화"},
                                            searchWidth = "w-[270px]",
                                           useSearch= false}) => {
    const [groups, setGroups] = useState(allGroups);
    const [currentGrp, setCurrentGrp] = useState(null);
    const [allPermissions, setAllPermissions] = useState([]);

    // State to store form inputs
    const [formData, setFormData] = useState({
        permissions: [],
        groups: [],
    });

    // Handle checkbox changes
    const handleCheckboxChange = (option, column) => {
        const isSelected = formData.permissions.find(item => item.id === option.id)

        const updatedSelectedTypes = isSelected !== undefined
            ? formData.permissions.filter((type) => type.id !== option.id)
            : [...formData.permissions, option];
        let newGroups = formData.groups
        let exists = formData.groups.find(item => item.id === option.parentOrganizationGroup.id)
        if (exists === undefined) {
            let grp = groups.find(item => item.id === option.parentOrganizationGroup.id)
            newGroups.push(grp)
        }

        setFormData({ ...formData, permissions: updatedSelectedTypes, groups:newGroups });
    };

    // select/unselect click handler
    const handleSelectAll = (column) => {
        if(column === 'groups'){
            let allpermissions = [];
            let allGroups = [];
            groups.forEach(grp => {
                allGroups.push(grp)
                if(grp.subOrganizationGroupList && grp.subOrganizationGroupList.length) {
                    allpermissions.push(...grp.subOrganizationGroupList)
                }
            })
            if(formData.groups.length === groups.length){
                allpermissions= []
                allGroups= []
            }
            setFormData((prev) =>(
                { ...prev,  groups:allGroups, permissions:allpermissions }
            ));
        }
        if(column === 'permissions'){
            let ids = currentGrp && currentGrp.subOrganizationGroupList? currentGrp.subOrganizationGroupList.map(item =>{ return item.id}) : []
            const isAnyMatch = ids.some(id => formData.permissions.some(obj => obj.id === id));
            if (isAnyMatch){
                setFormData((old) =>({...old, permissions: formData.permissions.filter(item => !ids.includes(item.id))}))
            } else {
                let subOrganizationGroupList = currentGrp.subOrganizationGroupList ? currentGrp.subOrganizationGroupList : []
                setFormData((old) => ({
                    ...old,
                    permissions: [...formData.permissions, ...subOrganizationGroupList],
                    groups: [...old.groups, currentGrp]
                }))
            }
        }
    };

    // Generate all tags from all selected permissions
    useEffect(() => {
        let newlist = []
        if (formData.groups.length){
            formData.groups.forEach(group => {
                if (group.subOrganizationGroupList && group.subOrganizationGroupList.length){
                    let ifAnyChildExists = formData.permissions.filter(item => item.parentOrganizationGroup.id === group.id)
                    if (!ifAnyChildExists.length){
                        setFormData((prev) => ({...prev, groups: prev.groups.filter(item => item.id !== group.id)}))
                    }

                    if (ifAnyChildExists.length && ifAnyChildExists.length === group.subOrganizationGroupList.length) {
                        newlist.push({name: `${group.name} 전체`, id: group.id, type: 'all', parentId: null})
                    } else {
                        if(ifAnyChildExists.length) {
                            ifAnyChildExists.forEach(child => {
                                newlist.push({
                                    name: `${group.name} > ${child.name}`,
                                    id: child.id,
                                    parentId: group.id,
                                    type: 'child'
                                })
                            })
                        }
                    }
                } else {
                    let checkExists = newlist.find(item => item.id === group.id && item.type === 'all')
                    if (!checkExists){
                        newlist.push({name: `${group.name} 전체`, id: group.id, type: 'all', parentId: null})
                    }
                }
            })
        }
        setAllPermissions(newlist)
    }, [formData.permissions]);

    useEffect(() => {
        callBack(formData)
    }, [formData]);

    useEffect(() => {
        if (selectedGroups){
            setFormData(selectedGroups)
            setCurrentGrp(selectedGroups?.groups? selectedGroups.groups[0] : null)
        }
    }, [selectedGroups]);

    //group label click handle
    const labelClick = (organization) => {
        setCurrentGrp(organization)
    }

    //parent group check/unchecked click and check if exists then remove and if not then add
    const checkedUncheckedClick = (group, value) => {
        setCurrentGrp(group)
        if(value) {
            let checkExists = formData.permissions.filter(obj => obj.groupId === group.id)
            let subList = group.subOrganizationGroupList && group.subOrganizationGroupList.length ? group.subOrganizationGroupList: []
            if (checkExists.length) {
                let allPermissionExceptThisGroup = formData.permissions.filter(obj => obj.groupId !== group.id)
                setFormData((old) => ({
                    ...old,
                    permissions: [...allPermissionExceptThisGroup, ...subList],
                    groups: old.groups.filter(item => item.id !== group.id)
                }))
            } else {
                setFormData((old) => ({
                    ...old,
                    permissions: [...formData.permissions, ...subList],
                    groups: [...old.groups, group]
                }))
            }
        } else {
            let subList = group.subOrganizationGroupList && group.subOrganizationGroupList.length ? group.subOrganizationGroupList.map(item => item.id): []
            let allPermissionExceptThisGroup = formData.permissions.filter(obj =>  !subList.includes(obj.id))
            setFormData((old) => ({
                ...old,
                permissions: [...allPermissionExceptThisGroup],
                groups: old.groups.filter(item => item.id !== group.id)
            }))
        }
    }

    // each permission remove from tags item
    const removeTag = (option, type) => {
        if (option.type !== 'all'){
            setFormData((old) =>({
                ...old,
                permissions: old.permissions.filter(item => item.id !== option.id)
            }))
        } else {
            let formPermissions = formData.permissions.filter((obj) => obj.parentOrganizationGroup.id !== option.id)
            setFormData((old) => ({...old, permissions: formPermissions, groups: old.groups.filter(item => item.id !== option.id)}))
        }
    }

    // Permission reset button click handle
    const resetPermissions = () => {
        if(selectedGroups){
            setFormData(selectedGroups)
        } else {
            setFormData({
                groups: [],
                permissions: []
            })
        }
    }
    const getCheckedStatus = (option) => {
        let status = false
        if(formData.groups.find(obj => obj.id === option.id)){
            status = true;
        }
        return status
    }

    const getStatusOfPermissions = () => {
        let status = false
        let currentGrpSubList = currentGrp && currentGrp.subOrganizationGroupList ? currentGrp.subOrganizationGroupList.length : 0
        let permissionsList = formData.permissions.filter(item => item.parentOrganizationGroup.id === currentGrp.id)

        if(currentGrpSubList === permissionsList.length){
            status = true
        }
        return status
    }

    const handleInputChange = ( column, value) => {
        setSearch(value)
        const lowerCaseQuery = value.toLowerCase();
        const newListItems = searchList(allGroups, lowerCaseQuery);
        let searchResults =   generateSearchResult(newListItems)
        setGroups(searchResults)
    };
    const [search, setSearch] = useState('');

    return (
        <>
            <div className="flex-1 bg-white">
                <div className={`flex items-stretch ${!noBorderPadding ? 'border border-r-borderColor' : ""}`}>
                    <div className={`right-col flex-1 ${!noBorderPadding ? 'p-4' : ""}`}>
                        {useSearch &&
                            <div className={`flex ${searchWidth}`}>
                                <div className={`flex items-stretch w-full pb-3`}>
                                    <div className="right-col flex-1 w-full">
                                        <div className={"w-auto flex-auto relative"}>
                                            <LmsStandardInputField
                                                singleElement={true}
                                                fieldClass="w-full"
                                                name="search"
                                                value={search}
                                                placeholder="관리자명 혹은 ID를 검색해주세요."
                                                changeDataHandler={handleInputChange}
                                            />
                                            <span
                                                className={`bg-white cursor-pointer z-10 absolute right-4 top-1/2 transform -translate-y-1/2`}><img
                                                src="/images/search.png" alt="search"/></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="flex border border-borderColor flex-col">
                            <div className="flex border-b border-b-borderColor">
                                <div className="flex flex-col w-[270px] border-r border-r-borderColor">
                                    <div
                                        className="flex justify-between items-center border-b border-b-borderColor py-2 px-4">
                                        <span className={`text-black text-[13px]`}> {buttonLabels.firstStep}</span>
                                        <Button type="button" onClick={() => handleSelectAll('groups')}
                                                color="transparentSmall"
                                                className=" w-[90px] min-w-[auto] h-[28px] !pl-1 !pr-1 text-center cursor-pointer !text-[13px]">
                                            {formData.groups.length === groups.length
                                                ? "모두 선택 취소"
                                                : "전체 선택"}
                                        </Button>
                                    </div>
                                    <div className="flex justify-between custom-scrollbar h-[350px]">
                                        <ul className="w-full">
                                            {groups && groups.map((option, index) => (
                                                <li className={`px-4 py-3`} key={'parent' + index}>
                                                    <CheckboxField>
                                                        <Checkbox id={`option-${option.id}`}
                                                                  className={'cursor-pointer'}
                                                                  checked={getCheckedStatus(option)}
                                                                  clickHandler={(e) => checkedUncheckedClick(option, e)}
                                                                  color="lmscheckbox" name="allow_embedding"/>
                                                        <Label
                                                            className={`font-normal cursor-pointer  ${currentGrp && currentGrp.id === option.id ? 'text-themeColor' : 'text-black'}`}
                                                            onClick={() => labelClick(option)}>{option.name}</Label>
                                                    </CheckboxField>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col">

                                    <div
                                        className={`flex justify-between items-center border-b border-b-borderColor py-2 px-4`}>
                                        <span className={' text-black text-[13px] '} style={{"lineHeight": "28px"}}> {buttonLabels.secondStep}</span>
                                        {currentGrp && currentGrp.subOrganizationGroupList &&
                                            <Button type="button" onClick={() => handleSelectAll('permissions')}
                                                    color="transparentSmall"
                                                    className="w-[90px] min-w-[auto] h-[28px] !pl-1 !pr-1 text-center cursor-pointer !text-[13px]">
                                                {getStatusOfPermissions()
                                                    ? ""+buttonLabels.selectAllChild
                                                    : ""+buttonLabels.deselectAllChild}
                                            </Button>
                                        }
                                    </div>


                                    <ul className="w-full">
                                        {currentGrp && currentGrp.subOrganizationGroupList && currentGrp.subOrganizationGroupList.map((option, index) => (
                                            <RoleFormPermissionSingleElement
                                                key={`permission_ ${index}`}
                                                formData={formData}
                                                handleCheckboxChange={handleCheckboxChange}
                                                option={option}/>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex p-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="space-x-2">
                                        {allPermissions && allPermissions.map((permission, i) => (

                                            <Button color="transparentRoundedSmall"
                                                    key={'tag' + i}
                                                    className={'cursor-pointer'}
                                                    onClick={() => removeTag(permission, permission.id)}>
                                                {permission.name}
                                                <span><img src="/images/membership/close.png" alt=""/></span>
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex">
                                        <Button color="transparentSmall"
                                                className="min-w-[auto] w-[80px] h-[28px] !pl-3 !pr-3 cursor-pointer !text-[13px]"
                                                onClick={resetPermissions}>
                                            <span>
                                                <RotateCw size={16} />
                                            </span> {buttonLabels.reset}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LmsOrganizationMultipleSelect