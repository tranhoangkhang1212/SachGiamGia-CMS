import { IBaseAppProps } from '@/interfaces/Props';
import React from 'react';

interface IContentProps extends IBaseAppProps {}

const Content: React.FC<IContentProps> = (props) => {
    const { children } = props;
    return <div className="w-full px-12 pt-12 pb-4">{children}</div>;
};

export default Content;
