import { Form } from 'antd';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { FormLogin } from '../../entities';
import { LayoutAuth } from '../../entities/layoutAuth';
import { authApi } from '../../shared/api';
import { useAppSelector } from '../../shared/hooks';

const FormLoginFeatures = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);

    const { dataError, isError, isLoading, isAuth, token } = useAppSelector(
        (state) => state.auth
    );

    const [
        login,
        {
            isLoading: isLoadingLogin,
            isError: isErrorLogin,
            isSuccess: isSuccessLogin,
            data: loginData,
        },
    ] = authApi.useLoginMutation();

    useEffect(() => {
        if (isSuccessLogin && loginData) {
            // Перенаправляем на главную, если есть успешный ответ после входа
            navigate(location.state?.from || '/', { replace: true });
        }
    }, [isSuccessLogin, loginData]);

    const onFinish = async () => {
        await login(data);
    };

    if (isAuth && token) {
        // navigate(location.state?.from || "/", { replace: true });
        return (
            <Navigate
                to={location.state?.from || '/'}
                state={{ from: location }}
                replace={true}
            />
        );
    }

    return (
        <LayoutAuth>
            <FormLogin
                isErrorLogin={isErrorLogin}
                form={form}
                onFinish={onFinish}
                isLoading={isLoading || isLoadingLogin}
            />
        </LayoutAuth>
    );
};

export default FormLoginFeatures;
