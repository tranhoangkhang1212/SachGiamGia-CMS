import { BaseSidebarRoutes, SidebarRoutes } from '@/constants/Routes';
import { IBaseAppProps } from '@/interfaces/Props';
import { faAngleDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';
import { logo } from '~/assets/images';

const Sidebar = () => {
    const { pathname, push } = useRouter();

    return (
        <div className="min-w-[250px] bg-primary text-white h-screen overflow-y-auto">
            <div className="my-3 mx-4 flex justify-between items-center">
                <Image src={logo} height={25} alt={''} />
                <FontAwesomeIcon icon={faEye} className="cursor-pointer" size="lg" />
            </div>
            {SidebarRoutes.map((route, index) => (
                <Content
                    key={index}
                    title={route.title}
                    path={route.path}
                    subMenu={route.subRoutes}
                    currentPath={pathname}
                    pushRoute={push}
                />
            ))}
        </div>
    );
};

interface IContentProps extends IBaseAppProps {
    title: string;
    path: string;
    subMenu?: BaseSidebarRoutes[];
    currentPath: string;
    pushRoute: (url: string) => Promise<boolean>;
}

const Content: React.FC<IContentProps> = (props) => {
    const { title, path, subMenu = [], currentPath, pushRoute } = props;

    const allPaths = subMenu.map((sub) => sub.path);
    const defaultOpen = allPaths.includes(currentPath);
    const [isShowSubRoute, toggleShowSubRoute] = useToggle(defaultOpen);
    const active = path === currentPath;

    return (
        <div className="cursor-pointer">
            <Link
                className={clsx(
                    'flex justify-between items-end px-6 py-3 hover:bg-[#34725b]',
                    'duration-300 ease-in-out',
                    {
                        'bg-[#34725b]': active || isShowSubRoute,
                    },
                )}
                onClick={toggleShowSubRoute}
                href={subMenu.length > 0 ? currentPath : path}
            >
                <span>{title}</span>
                {subMenu.length > 0 && (
                    <span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={clsx('transition-transform duration-300 transform', {
                                '-rotate-180': isShowSubRoute,
                            })}
                        />
                    </span>
                )}
            </Link>
            <div
                className={clsx('transition-transform duration-300 transform origin-top', {
                    'visible scale-y-100': isShowSubRoute,
                    'invisible scale-y-0': !isShowSubRoute,
                })}
            >
                {subMenu.map((sub, index) => (
                    <SubRoute
                        key={index}
                        title={sub.title}
                        path={sub.path}
                        isVisible={isShowSubRoute}
                        currentPath={currentPath}
                        pushRoute={pushRoute}
                    />
                ))}
            </div>
        </div>
    );
};

interface ISubRouteProps extends IBaseAppProps {
    title: string;
    path: string;
    isVisible: boolean;
    currentPath: string;
    pushRoute: (url: string) => Promise<boolean>;
}

const SubRoute: React.FC<ISubRouteProps> = (props) => {
    const { title, path, isVisible, currentPath } = props;
    const active = path === currentPath;

    return (
        <Link
            className={clsx('bg-[#1e4b3b] transition-transform duration-300 transform hidden', { '!block': isVisible })}
            href={path}
        >
            <div className={clsx('pl-10 py-3', { 'bg-[#b1f8de] text-black': active })}>{title}</div>
        </Link>
    );
};

export default Sidebar;