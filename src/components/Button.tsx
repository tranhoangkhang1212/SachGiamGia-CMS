import { IBaseAppProps } from '@/interfaces/CommonProps';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';

interface IBaseButtonProps {
    text: string;
    onClick: () => void;
}
interface IButtonProps extends IBaseButtonProps, IBaseAppProps {
    type?: 'normal' | 'create';
    variant?: 'normal' | 'transparent' | 'white' | 'delete';
}

const Button: React.FC<IButtonProps> = (props) => {
    const { type = 'normal' } = props;
    if (type === 'create') {
        return <ButtonCreate {...props} />;
    }
    return <NormalButton {...props} />;
};

const NormalButton: React.FC<IButtonProps> = (props) => {
    const { text, className, onClick, variant = 'normal' } = props;
    return (
        <div
            className={clsx(
                'flex-center border-primary border-2 rounded-md px-6 py-2',
                'cursor-pointer duration-300 text-white font-semibold hover:bg-opacity-90',
                { 'bg-primary': variant === 'normal' },
                { 'bg-white !text-black': variant === 'white' },
                { 'bg-red-500 !text-white !border-red-500': variant === 'delete' },
                className,
            )}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

const ButtonCreate: React.FC<IButtonProps> = (props) => {
    const { text, onClick, className } = props;
    return (
        <div
            className={clsx(
                'border-primary border-2 rounded-md px-6 py-2',
                'cursor-pointer hover:bg-primary duration-300 hover:text-white',
                className,
            )}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-4">{text}</span>
        </div>
    );
};

export default Button;
