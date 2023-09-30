import slugify from 'slugify';

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const priceFormat = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
};

export const isBrowser = () => {
    return typeof window !== 'undefined';
};

export const randomString = () => {
    return (Math.random() + 1).toString(36).substring(7);
};

export const removeElementFromArray = <T>(array: T[], element: T) => {
    const index = array.indexOf(element);
    if (index <= -1) {
        return;
    }
    array.splice(index, 1);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const removeDiacritics = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const slugGenerate = (value: string) => {
    return slugify(value, { trim: true, lower: true });
};

export const createArrayWithSize = <T>(size: number, callBack: (index: number) => T) => {
    return [...Array(size)].map((_, index) => {
        return callBack(index);
    });
};
