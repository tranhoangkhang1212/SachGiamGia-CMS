import { BaseSidebarRoutes, SidebarRoutes } from '@/constants/Routes';
import { IBaseAppProps } from '@/interfaces/CommonProps';
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
            <div className="flex items-center justify-between mx-4 my-3">
                <Image src={logo} height={25} alt={''} />
                <Link href="https://www.sachgiamgia.vn/" target="_blank">
                    <FontAwesomeIcon icon={faEye} className="cursor-pointer" size="lg" />
                </Link>
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
    subMenu: BaseSidebarRoutes[];
    currentPath: string;
    pushRoute: (url: string) => Promise<boolean>;
}

const Content: React.FC<IContentProps> = (props) => {
    const { path, subMenu = [], currentPath, pushRoute } = props;

    const allPaths = subMenu.map((sub) => sub.path);
    const defaultOpen = allPaths.includes(currentPath);
    const [isShowSubRoute, toggleShowSubRoute] = useToggle(defaultOpen);
    const active = path === currentPath && currentPath !== '/';

    return (
        <div className="cursor-pointer">
            {subMenu.length < 0 ? (
                <MainMenu
                    isShowSubRoute={isShowSubRoute}
                    toggleShowSubRoute={toggleShowSubRoute}
                    {...props}
                    active={active}
                />
            ) : (
                <MainMenuNotRoute
                    isShowSubRoute={isShowSubRoute}
                    toggleShowSubRoute={toggleShowSubRoute}
                    {...props}
                    active={active}
                />
            )}
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

interface MainMenuProps {
    active: boolean;
    isShowSubRoute: boolean;
    toggleShowSubRoute: () => void;
    pushRoute: (url: string) => Promise<boolean>;
    path: string;
    title: string;
    subMenu: BaseSidebarRoutes[];
}

const MainMenu: React.FC<MainMenuProps> = (props) => {
    const { title, path, active, isShowSubRoute, toggleShowSubRoute, subMenu } = props;
    return (
        <Link
            className={clsx('flex justify-between items-end px-6 py-3 hover:bg-[#34725b]', 'duration-300 ease-in-out', {
                'bg-[#34725b]': active || isShowSubRoute,
            })}
            onClick={toggleShowSubRoute}
            href={path}
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
    );
};

const MainMenuNotRoute: React.FC<MainMenuProps> = (props) => {
    const { title, active, isShowSubRoute, toggleShowSubRoute, subMenu } = props;
    return (
        <div
            className={clsx('flex justify-between items-end px-6 py-3 hover:bg-[#34725b]', 'duration-300 ease-in-out', {
                'bg-[#34725b]': active || isShowSubRoute,
            })}
            onClick={toggleShowSubRoute}
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
