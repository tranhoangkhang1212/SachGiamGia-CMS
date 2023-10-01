import { IBaseAppProps } from '@/interfaces/CommonProps';
import { randomString } from '@/utils/CommonUtil';
import clsx from 'clsx';
import React from 'react';

interface IInputProps extends IBaseAppProps {
    name: string;
    require?: boolean;
    label?: string;
    type?: 'text' | 'number';
    onChange: (name: string, value: string | number) => void;
    variant?: 'normal' | 'border';
    value?: string | number;
    disabled?: boolean;
}

const Input: React.FC<IInputProps> = (props) => {
    const {
        className,
        name,
        require,
        type = 'text',
        label,
        onChange,
        variant = 'normal',
        value,
        disabled = false,
    } = props;

    const id = 'id' + randomString();
    return (
        <div className={clsx('flex items-start flex-col', className)}>
            <div className="flex items-center justify-between">
                <label htmlFor={id} className={clsx('text-white text-[18px]', { '!text-black': variant === 'border' })}>
                    {label}
                </label>
                {require && <span className="text-red-600 text-[24px]">*</span>}
            </div>
            <input
                id={id}
                type={type}
                className={clsx('outline-none px-2 py-2 w-full rounded text-black', {
                    'border-2': variant === 'border',
                    'bg-gray-100 cursor-no-drop': disabled,
                })}
                onChange={(e) => onChange(name, e.target.value)}
                value={value}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;
