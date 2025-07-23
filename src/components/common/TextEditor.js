"use client";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "@/utils/helpers/UploadAdapter";

export default function TextEditor({    name = '',
                                        value = '',
                                        placeholder= '',
                                        changeDataHandler = (name, value) => {}}) {
    const config = {
        language: "en",
        height: 300,
        extraPlugins: [uploadPlugin],
        placeholder: placeholder,
        ui: {
            viewportTopOffset: 60,
        }
    };

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return UploadAdapter(loader, true);
        };
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            config={config}
            data={value}
            onChange={( event, editor ) => {
                changeDataHandler(name, editor.getData())
            }}
        />
    );
}