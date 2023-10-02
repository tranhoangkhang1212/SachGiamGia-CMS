import { IBaseAppProps } from '@/interfaces/CommonProps';
import { getValue } from '@/utils/LocalStorage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Content from './Content';
interface ILayoutProps extends IBaseAppProps {}

const Toaster = dynamic(() => import('react-hot-toast').then((c) => c.Toaster), {
    ssr: false,
});

const Sidebar = dynamic(() => import('./Sidebar').then((c) => c), {
    ssr: false,
});

const Layout: React.FC<ILayoutProps> = (props) => {
    const { children } = props;
    const { push } = useRouter();
    const token = getValue('token');

    useEffect(() => {
        if (!token) {
            push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!token) {
        return (
            <div className="flex">
                <Toaster />
                <div>{children}</div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Toaster />
            <Sidebar />
            <Content>{children}</Content>
        </div>
    );
};

export default Layout;
