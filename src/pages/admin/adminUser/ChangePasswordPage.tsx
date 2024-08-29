import { Button, Col, Divider, List, Row, Space, Spin, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { authApi, newUserApi } from 'src/shared/api';

const ChangePasswordPage = () => {
    const { data } = newUserApi.useGetAllUserListQuery();
    const [
        changePassword,
        {
            isLoading: isLoadingChange,
            isSuccess: isSuccessChange,
            isError: isErrorChange,
        },
    ] = authApi.useChangePasswordMutation();
    const [stateErrorId, setStateErrorId] = React.useState(0);
    const [stateSuccessId, setStateSuccessId] = React.useState(0);
    const onHandleUpdatePassword = (userId: number) => {
        changePassword({
            userId: userId,
        });
        if (isErrorChange) {
            setStateErrorId(userId);
        }
        if (isSuccessChange) {
            setStateSuccessId(userId);
        }
    };

    return (
        <List
            size="small"
            // header={<HeaderCreateInvite />}
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
                                <p>
                                    {`${item.description.firstname} ${item.description.lastname}`}
                                </p>
                            </Col>

                            {/* <Divider type="vertical" />
                            <Col>
                                <Tag>
                                    {item.banned ? 'Заблокирован' : 'Активен'}
                                </Tag>
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                <Button>Заблокировать</Button>
                            </Col> */}
                            <Divider type="vertical" />
                            <Col>
                                {isLoadingChange ? (
                                    <Spin />
                                ) : (
                                    <Button
                                        onClick={() =>
                                            onHandleUpdatePassword(item.id)
                                        }
                                        size="small"
                                        type="primary"
                                    >
                                        Обновить пароль
                                    </Button>
                                )}
                                {(isSuccessChange &&
                                    stateSuccessId === item.id && (
                                        <Tag color="green">Успешно</Tag>
                                    )) ||
                                    (isErrorChange &&
                                        stateErrorId === item.id && (
                                            <Tag color="red">Ошибка</Tag>
                                        ))}
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                <Button size="small" type="link">
                                    <Link to={`${item.id}`}>Перейти</Link>
                                </Button>
                            </Col>
                        </Space>
                    </Row>
                </List.Item>
            ))}
        </List>
    );
};

export default ChangePasswordPage;
