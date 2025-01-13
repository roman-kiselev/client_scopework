import { Alert, Button, Card, Form, Row, Spin, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/shared/hooks';
import {
    IInputFormItemProps,
    IInputPasswordFormItemProps,
} from '../../shared/interfaces';
import { InputFormItem, InputPasswordFormItem } from '../../shared/ui';
const { Paragraph } = Typography;

const { Text } = Typography;

const propsEmail: IInputFormItemProps = {
    input: {
        placeholder: 'email@email.ru',
        type: 'email',
        size: 'large',
    },
    name: 'email',
    label: 'Почта',
    tooltip: 'Введите почту',
    rules: [
        {
            required: true,
            message: 'Введите почту',
        },
        {
            type: 'email',
            message: 'Введите корректную почту',
        },
    ],
};
const propsPassword: IInputPasswordFormItemProps = {
    input: {
        placeholder: 'Пароль',
        type: 'password',
        size: 'large',
    },
    label: 'Пароль',
    name: 'password',
    rules: [
        {
            required: true,
            message: 'Введите пароль',
        },
    ],
};

interface IFormLoginProps {
    form: any;
    onFinish: (values: any) => void;
    isErrorLogin: boolean;
    isLoading: boolean;
}

const FormLogin: React.FC<IFormLoginProps> = ({
    form,
    onFinish,
    isErrorLogin,
}) => {
    const { dataError, isError, isLoading, isAuth, token } = useAppSelector(
        (state) => state.auth
    );

    return (
        <>
            <Card title="Вход" bordered={true} style={{ maxWidth: 400 }}>
                <Form form={form} name="register" onFinish={onFinish}>
                    <InputFormItem
                        input={propsEmail.input}
                        name={propsEmail.name}
                        label={propsEmail.label}
                        tooltip={propsEmail.tooltip}
                        rules={propsEmail.rules}
                    />
                    <InputPasswordFormItem
                        input={propsPassword.input}
                        name={propsPassword.name}
                        label={propsPassword.label}
                        tooltip={propsPassword.tooltip}
                        rules={propsPassword.rules}
                    />
                    {isError && isErrorLogin ? (
                        <Row justify={'center'}>
                            <Alert
                                message={dataError?.errorDetails.message}
                                type="error"
                            />
                        </Row>
                    ) : null}

                    {isLoading ? (
                        <Spin />
                    ) : (
                        <>
                            <Row>
                                <Link to={'/login-without-password'}>
                                    Войти без пароля
                                </Link>
                            </Row>
                            <Row>
                                <Text>Нет аккаунта?</Text>
                                <Link to={'/register'}>Зарегистрироваться</Link>
                            </Row>

                            <Row style={{ marginTop: 10 }}>
                                <Button type="primary" htmlType="submit">
                                    Вход
                                </Button>
                            </Row>
                        </>
                    )}

                    <Row>
                        <Paragraph
                            style={{ fontSize: '12px', marginTop: '40px' }}
                        >
                            Задать вопросы и получить помощь можно по почте{' '}
                            <a href="mailto:stroi.energoservis@yandex.ru">
                                stroi.energoservis@yandex.ru
                            </a>
                        </Paragraph>
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default FormLogin;
