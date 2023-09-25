import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { logo } from '~/assets/images';
import { Cart, Search, User } from './Icons';

interface IProps {
    className?: string;
}

const Header = () => {
    return (
        <div className="px-4 bg-primary md:px-8 xl:px-0">
            <div className="flex flex-wrap items-center py-4 max-w-primary margin-center md:flex-nowrap">
                <LogoComponent className="basis-1/2 md:basis-[20%] lg:basis-[25%] xl:basis-1/4 order-1 md:order-1" />
                <SearchForm className="basis-full md:basis-[50%] lg:basis-[55%] xl:basis-2/4 order-3 md:order-2" />
                <CartComponent className="basis-1/2 md:basis-[30%] lg:basis-[25%] xl:basis-1/4 order-2 md:order-3" />
            </div>
        </div>
    );
};

const LogoComponent: React.FC<IProps> = ({ className }) => {
    const { push } = useRouter();

    const redirectToHome = () => {
        push('/');
    };
    return (
        <div className={className}>
            <Image
                priority={true}
                src={logo}
                alt={''}
                className="w-auto max-h-[50px] cursor-pointer"
                onClick={redirectToHome}
            />
        </div>
    );
};

const SearchForm: React.FC<IProps> = ({ className }) => {
    return (
        <div className={clsx('flex-center mx-0 md:mx-4', className)}>
            <div className="w-full md:w-[90%] mt-4 md:mt-0 h-[40px] flex items-center bg-[#fff] rounded-[5px]">
                <input type="text" className="w-full h-full text-[#000] outline-none p-2 rounded-[5px]" />
                <button className="w-[35px]">
                    <Search height="22px" />
                </button>
            </div>
        </div>
    );
};

const CartComponent: React.FC<IProps> = ({ className }) => {
    return (
        <div className={clsx('flex items-center justify-end', className)}>
            <div className="flex items-center cursor-pointer">
                <User height="30px" className="fill-[#fff] mr-2 hidden md:block" />
                <User height="25px" className="fill-[#fff] mr-2 md:hidden" />
                <div className="hidden md:block font-[600]">
                    <p className="flex items-center whitespace-nowrap hover:text-dark">Đăng nhập</p>
                    <span className="flex items-center whitespace-nowrap hover:text-dark">Đăng ký</span>
                </div>
            </div>
            <div className="flex items-center ml-2 cursor-pointer md:ml-8 hover:text-dark">
                <Cart height="30px" className="fill-[#fff] mr-2 hidden md:block" />
                <Cart height="25px" className="fill-[#fff] mr-2 md:hidden" />
                <span className="whitespace-nowrap hidden md:block font-[600]">Giỏ hàng (000)</span>
            </div>
        </div>
    );
};

export default Header;
