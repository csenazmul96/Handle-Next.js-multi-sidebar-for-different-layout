import { ErrorMessage } from "@/components/common/fieldset";
import { Textarea } from "@/components/common/textarea";
import { Field } from "@headlessui/react";

const LmsStandardTextArea = ({
  required = false,
  label = "",
  singleElement = false,
  name = "",
  type = "text",
  value = "",
  error = null,
  placeholder = "",
  vertical = false,
  changeDataHandler = (name, value) => {},
}) => {
  return (
    <div
      className={`flex items-center ${
        singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
      }`}
    >
      {label && (
        <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
          <span className="common-label-style">
            {required && vertical && (
              <span className="text-dangerColor">*</span>
            )}
            {label}
            {required && !vertical && (
              <span className="text-dangerColor">*</span>
            )}
          </span>
        </div>
      )}
      <div
        className={` ${
          singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
        }`}
      >
        <Field className="!pb-0">
          <Textarea
            name={name}
            value={value || ""}
            onChange={(e) => changeDataHandler(name, e.target.value)}
            placeholder={placeholder}
          />
          {error && <ErrorMessage className="!mt-0">{error}</ErrorMessage>}
        </Field>
      </div>
    </div>
  );
};

export default LmsStandardTextArea;
