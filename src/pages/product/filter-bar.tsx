import Select from '@/components/Select';
import { EFilterData } from '@/constants/FilterData.enum';
import React from 'react';
import { IOptionData } from '.';

interface IFilterBarProps {
    defaultData: IOptionData[];
    data: IOptionData[];
    onChange: (type: EFilterData, title: string, value: string) => void;
}

const FilterBar: React.FC<IFilterBarProps> = (props) => {
    const { defaultData = [], data, onChange } = props;

    const getAllOptions = (): string[] => {
        return data.map((e) => e.options.map((v) => v.label)).flatMap((e) => e);
    };

    return (
        <div>
            {getAllOptions().length > 0 && (
                <div className="flex flex-wrap mb-4 max-h-[62px] overflow-y-auto">
                    {getAllOptions().map((value) => (
                        <div key={value} className="bg-red-500 mr-4 text-white rounded-xl px-3 mb-2">
                            {value}
                        </div>
                    ))}
                </div>
            )}
            <div className="flex">
                {defaultData.map((field, index) => (
                    <div key={index} className="mr-4 last:mr-0">
                        <span>{field.title}</span>
                        <Select
                            options={field.options}
                            onChange={(value) => onChange(field.type, field.title, value.toString())}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
