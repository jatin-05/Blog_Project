import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control,label, defaultValue=''}) {
  return (
    <div>
        {label && <label className='mb-1 pl-1' htmlFor="">{label}</label>}

        <controller
        name={name || 'context'}
        control={control}
        render={ ({field: {onChange}})=>(
            <Editor
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,

                heigth:500,
                menubar:true,
                plugins: [
                    "image",
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
                    "anchor",
                  ],
                  toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  content

            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE