import { removeDiacritics } from '@/utils/CommonUtil';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import { useToggle } from 'react-use';
import { IOption } from './Select';

interface INewSelectProps {
    className?: string;
    title?: string;
    options: IOption[];
    onChange: (value: string | number) => void;
    getNewOption?: () => Promise<IOption[]>;
}

const NewSelect: React.FC<INewSelectProps> = (props) => {
    const { className, title, options: defaultOptions = [], onChange, getNewOption } = props;
    const [isShowSelectOption, toggleSelectOption] = useToggle(true);
    const [options, setOptions] = useState<IOption[]>(defaultOptions);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name === '') {
            setOptions(defaultOptions);
        } else {
            const resultName = removeDiacritics(name);
            const search = new RegExp(resultName, 'i');
            const data = defaultOptions?.filter((v) => search.test(removeDiacritics(v.label) || ''));
            setOptions(data);
        }
    };

    const handleMoreClick = async () => {
        if (!getNewOption) {
            return;
        }
        const newOption = await getNewOption();
        setOptions([...options, ...newOption]);
    };

    return (
        <div className={clsx('max-w-auto relative', className)}>
            <div
                className={clsx('px-2 py-[6px] border-2 flex justify-between items-center', 'rounded-md', {
                    'border-primary': isShowSelectOption,
                })}
                onClick={toggleSelectOption}
            >
                <span>{title}</span> <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {defaultOptions.length > 0 && (
                <Options
                    options={options}
                    handleFilterChange={handleFilterChange}
                    isShow={isShowSelectOption}
                    onChange={onChange}
                    onMoreClick={handleMoreClick}
                    isShowMore={!!getNewOption}
                />
            )}
        </div>
    );
};

interface IOptionsProps {
    isShow?: boolean;
    options: IOption[];
    handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange: (value: string | number) => void;
    onMoreClick?: () => void;
    isShowMore?: boolean;
}

const Options: React.FC<IOptionsProps> = (props) => {
    const { isShow, options, handleFilterChange, onChange, onMoreClick, isShowMore = false } = props;

    return (
        <div
            className={clsx(
                'border-2w-full shadow-default p-2 mt-2',
                'bg-gray-600 text-white rounded-md',
                'transition-transform duration-300 transform origin-top',
                { 'invisible scale-y-0': !isShow },
                { 'visible scale-y-100': isShow },
            )}
        >
            <div className="mb-2">
                <input
                    type="text"
                    className="outline-primary rounded-md text-black w-full h-[35px]"
                    onChange={handleFilterChange}
                />
            </div>
            <div className="max-h-[220px] overflow-y-auto">
                {options.map((option, index) => (
                    <Checkbox
                        key={index}
                        id={Math.random().toString()}
                        label={option.label}
                        value={option.value}
                        onChange={onChange}
                    />
                ))}
                {onMoreClick && isShowMore ? <ViewMore onClick={onMoreClick} /> : <></>}
            </div>
        </div>
    );
};

interface ICheckboxProps {
    id: string;
    label?: string;
    value: string | number;
    onChange: (value: string | number) => void;
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const { id, label, value, onChange } = props;

    const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="px-2 py-1 w-full justify-start hover:bg-gray-500 rounded-[4px] flex items-center">
            <input
                type="checkbox"
                id={id}
                className="w-[14px] h-[14px] rounded-[4px] outline-none"
                value={value}
                onChange={handleSelected}
            />
            {label && (
                <label htmlFor={id} className="w-full pt-1 ml-1">
                    {label}
                </label>
            )}
        </div>
    );
};

interface IViewMoreProps {
    onClick: () => void;
}

const ViewMore: React.FC<IViewMoreProps> = (props) => {
    const { onClick } = props;

    return (
        <div className="py-1 mt-2 border-2 rounded-md cursor-pointer flex-center" onClick={onClick}>
            <span>View More</span>
        </div>
    );
};

export default NewSelect;
