import { IBaseAppProps } from '@/interfaces/Props';
import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import { Toaster } from 'react-hot-toast';

interface ILayoutProps extends IBaseAppProps {}

const Layout: React.FC<ILayoutProps> = (props) => {
    const { children } = props;
    return (
        <div className="flex">
            <Toaster />
            <Sidebar />
            <Content>{children}</Content>
        </div>
    );
};

export default Layout;
