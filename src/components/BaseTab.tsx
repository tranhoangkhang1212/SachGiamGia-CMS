import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

interface BaseTabProps {
    names: string[];
    components: JSX.Element[];
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
    const { names, components } = props;

    return (
        <Tab.Group defaultIndex={0}>
            <Tab.List>
                {names.map((name, index) => (
                    <Tab key={index} className="mr-6 last:mr-0">
                        {({ selected }) => (
                            <div
                                className={clsx('border-b-2 hover:border-primary duration-300', {
                                    'border-primary': selected,
                                    'border-transparent': !selected,
                                })}
                            >
                                {selected}
                                {name}
                            </div>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
                {components.map((component, index) => (
                    <Tab.Panel key={index}>{component}</Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default BaseTab;
