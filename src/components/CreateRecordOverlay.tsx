import { IBaseAppProps } from '@/interfaces/CommonProps';
import clsx from 'clsx';
import React from 'react';
import Button from './Button';
import Input from './Input';
import Overlay, { IBaseOverlayProps } from './Overlay';

interface ICreateRecordOverlayProps extends IBaseOverlayProps, IBaseAppProps {
    handleInputChange: (name: string, value: string | number) => void;
    onClick: () => void;
    onClose?: () => void;
}

const CreateRecordOverlay: React.FC<ICreateRecordOverlayProps> = (props) => {
    const { className, isShow, toggle, handleInputChange, onClick, onClose } = props;

    return (
        <Overlay isShow={isShow} toggle={toggle}>
            <div className={clsx('min-w-[350px]', className)}>
                <Input name="name" label="Tên" className="mb-4" require onChange={handleInputChange} />
            </div>
            <div className="flex justify-between">
                <Button className="basis-[48%]" text="Tạo mới" onClick={onClick} />
                <Button className="basis-[48%]" text="Đóng" variant="white" onClick={!onClose ? toggle : onClose} />
            </div>
        </Overlay>
    );
};

export default CreateRecordOverlay;
