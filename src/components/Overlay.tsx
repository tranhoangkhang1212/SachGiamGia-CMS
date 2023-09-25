import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useRef } from 'react';

export interface IBaseOverlayProps {
    isShow: boolean;
    toggle: () => void;
}

interface IOverlayProps extends IBaseOverlayProps {
    children?: JSX.Element | JSX.Element[];
    className?: string;
    autoPosition?: boolean;
}

const Overlay: React.FC<IOverlayProps> = (props) => {
    const { children, isShow = false, toggle, autoPosition = false } = props;

    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={toggle}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        className={clsx({
                            'flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0':
                                !autoPosition,
                        })}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel>{children}</Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Overlay;
