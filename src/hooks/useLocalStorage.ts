import toast from 'react-hot-toast';

const useLocalStorage = () => {
    const addValue = (key: string, value?: string) => {
        if (!value) {
            toast.error(`LocalStorage value must not be null ${key}`);
            return;
        }
        localStorage.setItem(key, value);
    };

    const getValue = (key: string) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const removeValue = (key: string) => {
        return localStorage.removeItem(key);
    };

    return {
        addValue,
        getValue,
        removeValue,
    };
};

export default useLocalStorage;
