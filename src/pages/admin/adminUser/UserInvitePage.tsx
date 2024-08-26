import { Button, Col, Divider, Form, List, Row, Space, Spin } from 'antd';
import { useState } from 'react';
import { inviteTokensApi, mailApi } from 'src/shared/api';
import { IInputFormItemProps } from 'src/shared/interfaces';
import { EmptyModal, InputFormItem } from 'src/shared/ui';

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

const HeaderCreateInvite = () => {
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    const [sendEmail, { isLoading }] = mailApi.useSendInviteTokensMutation();

    const handleClose = () => {
        setStateModal(false);
    };

    const onFinish = () => {
        sendEmail({
            email: data.email,
        });
    };

    return (
        <Row>
            <EmptyModal
                handleCancel={handleClose}
                open={stateModal}
                title="Создание приглашения"
            >
                <Form form={form} onFinish={onFinish}>
                    {!isLoading ? (
                        <>
                            <Form.Item name={'email'}>
                                <InputFormItem
                                    input={propsEmail.input}
                                    name={propsEmail.name}
                                    label={propsEmail.label}
                                    tooltip={propsEmail.tooltip}
                                    rules={propsEmail.rules}
                                />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Создать
                            </Button>
                        </>
                    ) : (
                        <Spin />
                    )}
                </Form>
            </EmptyModal>
            <Space>
                <Col span={24}>
                    <h2>Список</h2>
                </Col>
                <Col span={24}>
                    <Button
                        onClick={() => setStateModal(true)}
                        size="small"
                        type="primary"
                    >
                        +
                    </Button>
                </Col>
            </Space>
        </Row>
    );
};

const UserInvitePage = () => {
    const { data } = inviteTokensApi.useGetInviteTokensListQuery();
    const [update, { isLoading: isLoadingUpdate }] =
        mailApi.useSendUpdateInviteTokensMutation();
    const onHandleUpdate = (email: string) => {
        update({
            email: email,
        });
    };

    return (
        <List
            size="small"
            header={<HeaderCreateInvite />}
            //footer={<div>Footer</div>}
            bordered
            // dataSource={data}
            // renderItem={(item) => <List.Item>{item}</List.Item>}
        >
            {data?.map((item, index) => (
                <List.Item key={item.id}>
                    <Row>
                        <Space>
                            <Col>{index + 1}.</Col>
                            <Col>
                                Email: <a>{item.email}</a>
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                {item.expired ? (
                                    <a>Срок действия истек</a>
                                ) : (
                                    <a>Срок действия не истек</a>
                                )}
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                {item.is_used ? (
                                    <a>Токен использован</a>
                                ) : (
                                    <a>Токен не использован</a>
                                )}
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                {isLoadingUpdate ? (
                                    <Spin />
                                ) : (
                                    <Button
                                        onClick={() =>
                                            onHandleUpdate(item.email)
                                        }
                                        size="small"
                                        type="primary"
                                    >
                                        Обновить приглашение
                                    </Button>
                                )}
                            </Col>
                            <Divider type="vertical" />
                        </Space>
                    </Row>
                </List.Item>
            ))}
        </List>
    );
};

export default UserInvitePage;
