import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingOverlay from '@/components/LoadingOverlay';
import { SignInResponseDto } from '@/interfaces/response/SignInResponseDto';
import { executePostHardTokenWithBody } from '@/utils/APIUtil';
import { addValue, getValue } from '@/utils/LocalStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import bg from '~/assets/images/bg.jpg';

const Login = () => {
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const { push } = useRouter();

    const handleInputChange = (name: string, value: string | number) => {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            if (!userInfo.email) {
                toast.error('Vui lòng nhập email');
                return;
            }
            if (!userInfo.password) {
                toast.error('Vui lòng nhập mật khẩu');
                return;
            }
            setIsLoading(true);
            const { data }: { data: SignInResponseDto } = await executePostHardTokenWithBody('/user/sign-in', userInfo);
            handleSaveUserLocalData(data);
            toast.success('Đăng nhập thành công');
            push('/');
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveUserLocalData = (data: SignInResponseDto) => {
        const { id, name, token, email } = data;
        addValue('token', token);
        addValue('local-data', JSON.stringify({ id, name, email }));
    };

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_HARD_TOKEN);

        const token = getValue('token');
        if (token) {
            push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div
                className="flex flex-col items-center w-screen h-screen overflow-hidden"
                style={{ backgroundImage: `url(${bg.src})` }}
            >
                <div className="flex-col flex-center w-[420px] mt-24">
                    <div className="uppercase">
                        <h1 className="text-center text-primary text-[32px] font-bold">Sách giảm giá</h1>
                        <h2 className="text-center text-white text-[24px] font-bold">CMS Login</h2>
                    </div>
                    <div className="w-full mt-14">
                        <Input name="email" label="Email" onChange={handleInputChange} />
                        <Input
                            className="mt-6"
                            name="password"
                            label="Password"
                            onChange={handleInputChange}
                            type="password"
                        />
                        <div className="flex-center">
                            <Button className="mt-4" text="Đăng nhập" onClick={handleLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
