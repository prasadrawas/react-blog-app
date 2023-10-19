import React from "react";
import { Editor } from "@tinymce/tinymce-react";
function BlogEditor({ editorRef, label, initialValue }) {
  return (
    <div className="w-full">
      <label className="font-semibold">{label}</label>
        <div className="my-2"/>
      <Editor

        //   apiKey="your-api-key"
        
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue= {initialValue ? initialValue : ""}
        init={{
          height: 500,
          width: "100%",
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

export default BlogEditor;
