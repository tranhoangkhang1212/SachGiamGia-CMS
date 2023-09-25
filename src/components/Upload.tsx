import React from 'react';

interface FormData {
    file?: File;
    name?: string;
}
const Upload = () => {
    const [requestData, setRequest] = useState<FormData>();
    const onChange = (file: ChangeEvent) => {
        const { files } = file.target as HTMLInputElement;
        if (files && files.length !== 0) {
            setRequest((prev) => ({ ...prev, file: files[0], name: 'Khangth_001' }));
        }
    };
    const handleUploadFile = async () => {
        const formData = new FormData();
        for (const key in requestData) {
            const request = requestData[key as keyof FormData];
            console.log(request);

            if (request) {
                formData.append(key, request);
            }
        }
        console.log(formData);

        const { data } = await API.post('file-upload/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    console.log(requestData);

    return (
        <div className="text-black">
            <input type="file" onChange={onChange} />
            <button className="px-2 border-2" onClick={handleUploadFile}>
                Submit
            </button>
        </div>
    );
};

export default Upload;
