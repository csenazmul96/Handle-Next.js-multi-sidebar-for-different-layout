"use client";

import { Button } from "@/components/common/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/common/dialog";
import LmsStandardInputField from "@/components/common/form/LmsStandardInputField";
import { useEffect, useState } from "react";

import { usePageSidebarContext } from "@/store/PageSidebarContext";
import {
  createEditParentGroup,
  createEditSubGroup,
  createEditSubSubGroup,
} from "@/utils/api/lmsPageCommonSidebar";
import { formatErrors } from "@/utils/helpers/ErrorHeloper";
import { toast } from "react-toastify";

const LmsCommonPageSidebarForm = ({ apiPrefix, apiPostFix, tag = "" }) => {
  const {
    openForm,
    activeDropdown,
    actionType,
    setActionType,
    currentGroup,
    setOpenForm,
  } = usePageSidebarContext();

  const cancelForm = () => {
    setOpenForm(false);
    setActionType("");
  };

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "" });
  const handleOnChange = (column, value) => {
    setForm((prev) => ({ ...prev, [column]: value }));
  };

  useEffect(() => {
    if (openForm) {
      if (currentGroup && actionType === "edit") {
        setForm({ name: currentGroup.name });
      } else {
        setForm({ name: "" });
      }
      setErrors(null);
    }
  }, [openForm, actionType, currentGroup]);

  const submitForm = async () => {
    setLoading(true);
    try {
      let response = null;
      let newForm = { ...form };

      if (actionType === "edit") {
        newForm = {
          ...form,
          id: currentGroup.id,
        };
      }

      if (!currentGroup) {
        response = await createEditParentGroup(
          newForm,
          `${apiPrefix}/${apiPostFix}`,
          tag
        );
      } else {
        if (currentGroup.level === 1) {
          if (actionType === "edit") {
            response = await createEditParentGroup(
              newForm,
              `${apiPrefix}/${apiPostFix}`,
              tag
            );
          } else {
            response = await createEditSubGroup(
              newForm,
              currentGroup.id,
              `${apiPrefix}/sub/${apiPostFix}`,
              tag
            );
          }
        } else if (currentGroup.level === 2) {
          if (actionType === "edit") {
            response = await createEditSubGroup(
              newForm,
              activeDropdown.first.id,
              `${apiPrefix}/sub/${apiPostFix}`,
              tag
            );
          } else {
            response = await createEditSubSubGroup(
              newForm,
              currentGroup.id,
              `${apiPrefix}/sub-sub/${apiPostFix}`,
              tag
            );
          }
        } else if (currentGroup.level === 3) {
          if (actionType === "edit") {
            response = await createEditSubSubGroup(
              newForm,
              activeDropdown.second.id,
              `${apiPrefix}/sub-sub/${apiPostFix}`,
              tag
            );
          }
        }
      }

      if (response && response.status === "success") {
        cancelForm();
        toast.success(
          `${
            currentGroup ? "Group has been updated" : "Group has been created"
          }`
        );
      } else {
        if (response?.errors) {
          setErrors(formatErrors(response?.errors));
        }
        toast.error("something went wrong!");
      }
    } catch (e) {
      toast.error("something went wrong!");
    }

    setLoading(false);
  };

  const isEdit = actionType === "edit" && currentGroup && currentGroup.id;

  return (
    <>
      <Dialog open={openForm} onClose={setOpenForm}>
        <DialogTitle>
          <span>{isEdit ? "그룹 수정" : "그룹 추가"}</span>
        </DialogTitle>
        <DialogBody>
          <LmsStandardInputField
            error={errors?.name}
            name="name"
            label={"그룹명"}
            vertical={true}
            fieldClass={"w-full"}
            value={form.name}
            placeholder="그룹명을 입력해주세요."
            changeDataHandler={handleOnChange}
          />
        </DialogBody>
        <DialogActions>
          <Button
            type="button"
            color="transparentMedium"
            className={"!h-10"}
            onClick={cancelForm}
          >
            {" "}
            취소{" "}
          </Button>
          <Button
            type="button"
            disable={!form.name ? true : loading ? true : false}
            color={`${!form.name ? "secondaryMedium" : "primaryMedium"}`}
            className={"!h-10"}
            loading={loading}
            onClick={submitForm}
          >
            {" "}
            확인{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LmsCommonPageSidebarForm;
