import { IBaseAppProps } from '@/interfaces/Props';
import { randomString } from '@/utils/CommonUtil';
import clsx from 'clsx';
import React from 'react';

interface IInputProps extends IBaseAppProps {
    name: string;
    require?: boolean;
    label?: string;
    type?: 'text' | 'number';
    onChange: (name: string, value: string | number) => void;
}

const Input: React.FC<IInputProps> = (props) => {
    const { className, name, require, type = 'text', label, onChange } = props;

    const id = 'id' + randomString();
    return (
        <div className={clsx('flex items-start flex-col', className)}>
            <div className="flex justify-between items-center">
                <label htmlFor={id} className="text-white text-[18px]">
                    {label}
                </label>
                {require && <span className="text-red-600 text-[24px]">*</span>}
            </div>
            <input
                id={id}
                type={type}
                className="outline-none px-2 py-2 w-full rounded text-black"
                onChange={(e) => onChange(name, e.target.value)}
            />
        </div>
    );
};

export default Input;
