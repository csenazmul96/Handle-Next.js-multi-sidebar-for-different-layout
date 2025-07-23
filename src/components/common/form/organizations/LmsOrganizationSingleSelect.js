"use client"
import React, {useState} from "react";
import {SlArrowRight} from "react-icons/sl";
import LmsStandardInputField from "@/components/common/form/LmsStandardInputField";
import {Button} from "@/components/common/button";
import {MdCheck} from "react-icons/md";
import {generateSearchResult, searchList} from "@/utils/helpers/CommonHelper";
import {Check, ChevronRight, Search} from "lucide-react";

export default function LmsOrganizationSingleSelect({classes = '', organizations, callBack = () => {}}) {
    const [allOrganizations, setAllOrganizations] = useState(organizations)
    const [currentGrp, setCurrentGrp] = useState(null);
    const [selectedChildOrganization, setSelectedChildOrganization] = useState(null);
    const [selectedSecondChildOrganization, setSelectedSecondChildOrganization] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState('');
    const handleInputChange = ( column, value) => {
        setSearch(value)
        const lowerCaseQuery = value.toLowerCase();
        const newListItems = searchList(organizations, lowerCaseQuery);
        let searchResults =  generateSearchResult(newListItems)
        setSearchResult(searchResults)
    };


    const fixedSelectedItem = async () => {
        if (selectedSecondChildOrganization){
            callBack(selectedSecondChildOrganization)
        } else if (selectedChildOrganization){
            callBack(selectedChildOrganization)
        } else {
            callBack(currentGrp)
        }
    }

    const selectParentGroup = (org) =>{
        setCurrentGrp(org)
        setSelectedChildOrganization(null)
    }

    const selectSearchResultItem = (org) =>{
        if(org.parent){
            setCurrentGrp(org.parent)
            setSelectedChildOrganization(org)
        } else {
            setCurrentGrp(org)
            setSelectedChildOrganization(null)
        }
        callBack(org)
    }
    const cleanSearch = () => {
      setSearch('')
      setSearchResult([])
    }
    const checkActiveStatus = (org) => {
      let status = false
        if( selectedChildOrganization){
            status = selectedChildOrganization.id === org.id ? true : false
        } else if (currentGrp){
            status = currentGrp.id === org.id ? true : false
        }
        return status
    }

    return (
        <div className={`flex-1 bg-white w-max p-4 mb-4 relative z-10 mt-[-1px] border border-placeholderColor ${classes}`}>
            <div className="flex items-stretch ">
                <div className="right-col flex-1">
                    <div className="flex">
                        <div className={`flex items-stretch   w-full ${!search && !searchResult.length ? 'pb-3' : ''} `}>
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
                                        className={`bg-white cursor-pointer z-10 absolute right-4 top-1/2 transform -translate-y-1/2`}>
                                        <Search size={24} className={`text-placeholderColor`} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex border border-borderColor ${search && searchResult.length ? 'border-t-0' : ''}  flex-col relative`}>
                        {search && searchResult.length ?
                            <div className="flex absolute max-h-[300px] w-full bg-gray-50 border-b border-b-borderColor search_wrap ">
                                <div className="flex justify-between custom-scrollbar w-full">
                                    <ul className="space-y-4 pl-0 pr-0 w-full">
                                        {searchResult && searchResult.map((organization, index) => (
                                            <li key={'parent' + index}
                                                className={`flex justify-between items-center w-full cursor-pointer pl-3 py-3 !mt-0
                                                ${checkActiveStatus(organization)   ? 'text-themeColor font-bold bg-primaryLightColor' : ''}
                                                `}
                                                onClick={() => selectSearchResultItem(organization)}>
                                                <span>{organization.grpName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div> : ''
                        }
                        <div className="flex">
                            <div className="flex flex-col w-[230px] border-r border-r-borderColor">
                                <div
                                    className="flex justify-between items-center border-b border-b-borderColor py-2 px-4 font-[13px]">
                                    <span>1차 그룹</span>
                                </div>
                                <div className="flex justify-between custom-scrollbar h-[230px]">
                                    <ul className="space-y-4 pl-0 pr-0 w-full">
                                        {allOrganizations && allOrganizations.map((organization, index) => (
                                            <li key={'parent' + index}
                                                className={`flex justify-between items-center w-full cursor-pointer px-4 py-3 !mt-0
                                                ${currentGrp && currentGrp.id === organization.id ? 'text-themeColor font-bold bg-primaryLightColor' : ''}
                                                `}
                                                onClick={() => selectParentGroup(organization)}>
                                                <span>{organization.name}</span>
                                                {organization.subOrganizationGroupList &&
                                                    <span className={''}> <ChevronRight size={24} />  </span>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col w-[230px] ">
                                <div
                                    className={`flex justify-between items-end border-b border-b-borderColor py-2 px-4 font-[13px]`}>
                                    <span className={'py-[0px]'}>2차 그룹</span>
                                </div>
                                <ul className="space-y-4 pl-0 pr-0 w-full">
                                    {currentGrp && currentGrp.subOrganizationGroupList && currentGrp.subOrganizationGroupList.map((organization, index) => (
                                        <li key={'parent' + index}
                                            className={`flex justify-between w-auto cursor-pointer  px-4 py-3 !mt-0
                                            ${selectedChildOrganization && selectedChildOrganization.id === organization.id ? 'text-themeColor font-bold bg-blue-50' : ''}`}
                                            onClick={() => setSelectedChildOrganization(organization)}>
                                            <span className={'mr-3'}>{organization.name}</span>
                                            {organization.subOrganizationGroupList.length > 0 &&
                                                <span className={''}> <ChevronRight size={24} />  </span>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 flex flex-col w-[230px] border-l border-l-borderColor">
                                <div
                                    className={`flex justify-between items-end border-b border-b-borderColor py-2 px-4 font-[13px]`}>
                                    <span className={'py-[0px]'}>3차 그룹</span>
                                </div>
                                <ul className="space-y-4 pl-0 pr-0 w-full">
                                    {selectedChildOrganization && selectedChildOrganization.subOrganizationGroupList && selectedChildOrganization.subOrganizationGroupList.map((organization, index) => (
                                        <li key={'third-level' + index}
                                            className={`flex justify-between w-auto cursor-pointer  px-4 py-3 !mt-0
                                            ${selectedSecondChildOrganization && selectedSecondChildOrganization.id === organization.id ? 'text-themeColor font-bold bg-blue-50' : ''}`}
                                            onClick={() => setSelectedSecondChildOrganization(organization)}>
                                            <span className={'mr-3'}>{organization.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="flex border border-borderColor border-t-0 justify-end py-2 px-4">
                        <Button color={"primary"} className={'w-[90px]'} onClick={fixedSelectedItem}>
                             <Check /> 선택
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}