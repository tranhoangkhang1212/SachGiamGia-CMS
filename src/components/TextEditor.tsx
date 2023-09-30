import dynamic from 'next/dynamic';
const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

interface ITextEditorProps {
    onChange: (value: string) => void;
    defaultValue?: string;
}

const TextEditor: React.FC<ITextEditorProps> = (props) => {
    const { onChange, defaultValue } = props;
    return (
        <div className="text-black">
            <SunEditor
                height="330px"
                autoFocus
                placeholder="Viết nội dung ở đây"
                setDefaultStyle="font-family: 'Roboto', sans-serif; font-size: 16px;"
                onChange={onChange}
                defaultValue={defaultValue}
                setOptions={{
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        ['removeFormat'],
                        '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image'], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview'],
                        ['save'],
                    ],
                }}
            />
        </div>
    );
};

export default TextEditor;
