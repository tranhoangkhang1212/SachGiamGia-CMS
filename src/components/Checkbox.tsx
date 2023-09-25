import { IBaseAppProps } from '@/interfaces/Props';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';

interface ICheckboxProps extends IBaseAppProps {
    title: string;
    checked: boolean;
    onClick: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const { className, title, checked, onClick } = props;
    return (
        <div className={clsx('flex items-center cursor-pointer', className)} onClick={onClick}>
            <div
                className={clsx('w-[18px] h-[18px] border-2 rounded border-primary flex-center', {
                    'bg-primary': checked,
                })}
            >
                <FontAwesomeIcon icon={faCheck} color={checked ? 'white' : 'transparent'} />
            </div>
            <span className="pt-1 ml-1">{title}</span>
        </div>
    );
};

export default Checkbox;
