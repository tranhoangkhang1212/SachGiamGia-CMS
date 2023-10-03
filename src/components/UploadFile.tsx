import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useState } from 'react';

interface IUploadProps {
    handleFileChange: (file: File) => void;
}

const UploadFile: React.FC<IUploadProps> = (props) => {
    const { handleFileChange } = props;
    const [fileName, setFileName] = useState('');

    const onChange = (file: ChangeEvent<HTMLInputElement>) => {
        const { files } = file.target as HTMLInputElement;
        if (files && files.length !== 0) {
            handleFileChange(files[0]);
            setFileName(files[0].name);
        }
    };
    const id = Math.random().toString();

    return (
        <div className="text-black ">
            <input type="file" className="hidden" id={id} onChange={onChange} />
            <label
                htmlFor={id}
                className="px-6 py-3 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
            >
                <FontAwesomeIcon icon={faCloudArrowUp} /> <span>Upload</span>
            </label>
            <div className="absolute mt-3">
                {fileName ? <span>File đã chọn: {fileName}</span> : <span>Không có file được chọn</span>}
            </div>
        </div>
    );
};

export default UploadFile;
