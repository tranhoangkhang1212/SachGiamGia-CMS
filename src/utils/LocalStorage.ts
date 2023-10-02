import toast from 'react-hot-toast';

export const addValue = (key: string, value?: string) => {
    if (!value) {
        toast.error(`LocalStorage value must not be null ${key}`);
        return;
    }
    localStorage.setItem(key, value);
};

export const getValue = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        toast.error((error as Error).message);
    }
};

export const removeValue = (key: string) => {
    localStorage.removeItem(key);
};
