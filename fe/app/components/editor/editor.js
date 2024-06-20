'use client';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import FontSelector from './fontSelector';
import Toolbar from "./toolbar";
import formats from "./formats";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = () => {
    const [values, setValues] = useState('');
    const modules = Toolbar();

    return (
        <div className="editor-container p-4 border rounded-lg shadow-lg bg-white h-[80vh] flex flex-col">
            <FontSelector />
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={values}
                onChange={setValues}
                className="h-full flex-grow"
            />
        </div>
    );
};

export default Editor;

