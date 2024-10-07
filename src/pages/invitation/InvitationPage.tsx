import { Button, Form, Input, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LayoutAuth } from 'src/entities/layoutAuth';
import { authApi, inviteTokensApi, organizationApi } from 'src/shared/api';
import {
    IInputFormItemProps,
    IInputPasswordFormItemProps,
} from 'src/shared/interfaces';
import { InputFormItem, InputPasswordFormItem } from 'src/shared/ui';

const propsFirstname: IInputFormItemProps = {
    input: {
        placeholder: 'Иван',
        type: 'nickname',
        size: 'large',
    },
    name: 'firstname',
    label: 'Имя',
    tooltip: 'Введите ваше имя',
    rules: [
        {
            required: true,
            message: 'Обязательное поле',
            whitespace: true,
        },
    ],
};
const propsLastname: IInputFormItemProps = {
    input: {
        placeholder: 'Иванов',
        type: 'nickname',
        size: 'large',
    },
    name: 'lastname',
    label: 'Фамилия',
    tooltip: 'Введите вашу фамилию',
    rules: [
        {
            required: true,
            message: 'Обязательное поле',
            whitespace: true,
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
const propsConfirm: IInputPasswordFormItemProps = {
    input: {
        placeholder: 'Повторно пароль',
        type: 'password',
        size: 'large',
    },
    label: 'Ещё раз',
    name: 'confirm',
    dependencies: ['password'],
    rules: [
        {
            required: true,
            message: 'Введите пароль ещё раз',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
            },
        }),
    ],
};

const InvitationPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [signUp, { isLoading: isLoadingSignUp, isSuccess }] =
        authApi.useRegisterMutation();
    const { isLoading: isLoadingToken, data: dataToken } =
        inviteTokensApi.useCheckInviteTokenQuery({ token: token! });

    const { isLoading: isLoadingOrganization, data: dataOrganization } =
        organizationApi.useGetOrganizationQuery({
            id: dataToken?.org_id.toString() || '',
            token: token || '',
        });

    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    useEffect(() => {
        form.setFieldValue('email', dataToken?.email);
        form.setFieldValue('nameOrganization', dataOrganization?.name);
        form.setFieldValue('addressOrganization', dataOrganization?.address);
    }, [dataToken, dataOrganization]);

    if (isLoadingToken || isLoadingOrganization || isLoadingSignUp) {
        return <Spin />;
    }
    const onFinish = () => {
        signUp({
            email: dataToken?.email || '',
            firstname: data.firstname,
            lastname: data.lastname,
            organizationId: dataToken?.org_id || 0,
            password: data.password,
            token: token || '',
        }).then(() => {
            navigate('/');
        });
    };
    // if (isSuccess) {
    //     navigate('/');
    // }

    return (
        <LayoutAuth>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="email" label="Почта">
                    <Input disabled />
                </Form.Item>
                <InputPasswordFormItem
                    input={propsPassword.input}
                    name={propsPassword.name}
                    label={propsPassword.label}
                    tooltip={propsPassword.tooltip}
                    rules={propsPassword.rules}
                />
                <InputPasswordFormItem
                    input={propsConfirm.input}
                    name={propsConfirm.name}
                    label={propsConfirm.label}
                    tooltip={propsConfirm.tooltip}
                    rules={propsConfirm.rules}
                />
                <InputFormItem
                    input={propsFirstname.input}
                    name={propsFirstname.name}
                    label={propsFirstname.label}
                    tooltip={propsFirstname.tooltip}
                    rules={propsFirstname.rules}
                />
                <InputFormItem
                    input={propsLastname.input}
                    name={propsLastname.name}
                    label={propsLastname.label}
                    tooltip={propsLastname.tooltip}
                    rules={propsLastname.rules}
                />
                <Form.Item
                    name="nameOrganization"
                    label="Наименование организации"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item name="addressOrganization" label="Адрес организации">
                    <Input disabled />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Регистрация
                </Button>
            </Form>
        </LayoutAuth>
    );
};

export default InvitationPage;
