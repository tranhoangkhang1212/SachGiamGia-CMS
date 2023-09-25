import { IBaseAppProps } from '@/interfaces/Props';
import clsx from 'clsx';
import React from 'react';

export interface IOption {
    label: string;
    value: string | number;
}
interface ISelectProps extends IBaseAppProps {
    defaultOption?: boolean;
    options: IOption[];
    onChange: (value: string | number) => void;
}

const Select: React.FC<ISelectProps> = (props) => {
    const { className, options = [], onChange } = props;

    return (
        <div className={clsx('mb-4', className)}>
            <select
                className="border-[1px] border-primary rounded cursor-pointer h-[25px]"
                onChange={(e) => onChange(e.target.value)}
            >
                <option value=""></option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
