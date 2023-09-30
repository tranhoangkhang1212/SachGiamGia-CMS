import React from 'react';
import Overlay from './Overlay';
import Button from './Button';

interface IConfirmDeleteProps {
    text?: string;
    onConfirm: () => void;
    onDestroy: () => void;
}

const ConfirmDelete: React.FC<IConfirmDeleteProps> = (props) => {
    const { text = 'Bạn có muốn xóa phần tử đã chọn?', onConfirm, onDestroy } = props;
    return (
        <Overlay isShow toggle={() => {}}>
            <div className="bg-white min-w-[380px] min-h-[150px] flex-center flex-col rounded-md px-6">
                <h3 className="font-semibold text-[18px]">{text}</h3>
                <div className="flex justify-between w-full mt-4">
                    <Button className="basis-[48%]" text="Hủy" onClick={onDestroy} variant="white" />
                    <Button className="basis-[48%]" text="Xác nhận" onClick={onConfirm} />
                </div>
            </div>
        </Overlay>
    );
};

export default ConfirmDelete;
