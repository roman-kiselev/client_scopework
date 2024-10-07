import {
    Button,
    Col,
    DatePicker,
    Input,
    Popconfirm,
    Row,
    Spin,
    message,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { listNameWorkApi } from '../../shared/api';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import {
    resetForOneItem,
    resetSelectedData,
    setNameAndDescription,
} from '../../shared/models';

const dateFormat = 'YYYY-MM-DD';

const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
};
const MainNameWork = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { idNumber, dateCreate, name, description } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );

    useEffect(() => {
        dispatch(resetForOneItem());
        dispatch(resetSelectedData());
    }, [dispatch]);

    const { isLoading: isLoadingQuery } = listNameWorkApi.useGetOneByIdQuery(
        {
            id: Number(id) ? Number(id) : 0,
        },
        {
            skip: !id,
        }
    );

    // Получаем состояние oneItem
    const { isLoading } = useAppSelector((store) => store.nameWorkList);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ name: value }));
    };

    const handleChangeDescription = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ description: value }));
    };

    if (isLoading || isLoadingQuery) {
        return <Spin />;
    }

    return (
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Form form={form} name="nest-messages" style={{ maxWidth: 600 }}>
                {idNumber && (
                    <Row>
                        <Row>
                            <Col style={{ margin: 10 }}>
                                <h3>Список № {idNumber}</h3>
                            </Col>
                            <Col style={{ margin: 10 }}>
                                <DatePicker
                                    defaultValue={dayjs(dateCreate, dateFormat)}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Row>
                )}

                <Row style={{ marginTop: 10 }}>
                    <Form.Item
                        initialValue={name ? name : ''}
                        name={'name'}
                        label="Наименование"
                    >
                        <Input
                            value={name}
                            onChange={(e) => handleChangeName(e)}
                        />
                    </Form.Item>
                </Row>
                <Form.Item
                    initialValue={description ? description : ''}
                    name={'description'}
                    label="Описание"
                >
                    <Input
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
                    />
                </Form.Item>
                <Row>
                    {idNumber && (
                        <Col style={{ margin: 10 }}>
                            <Popconfirm
                                title="Удалить ед.измерения!"
                                description="Вы уверены что хотите удалить?"
                                onConfirm={() => confirm}
                                onCancel={() => cancel}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button danger>Удалить список</Button>
                            </Popconfirm>
                        </Col>
                    )}
                </Row>
            </Form> */}
            <Row>
                {idNumber && (
                    <Row>
                        <Row>
                            <Col style={{ margin: 10 }}>
                                <h3>Список № {idNumber}</h3>
                            </Col>
                            <Col style={{ margin: 10 }}>
                                <DatePicker
                                    defaultValue={dayjs(dateCreate, dateFormat)}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Row>
                )}

                <Row style={{ width: '100%', marginTop: 10 }}>
                    <Col style={{ margin: 10 }}>
                        <label htmlFor="name">Наименование</label>
                    </Col>
                    <Col style={{ width: '60%' }}>
                        <Input
                            width={'100%'}
                            value={name}
                            onChange={(e) => handleChangeName(e)}
                        />
                    </Col>
                </Row>
                <Row style={{ width: '100%', marginTop: 10 }}>
                    <Col style={{ margin: 10 }}>
                        <label htmlFor="name">Описание</label>
                    </Col>
                    <Col style={{ width: '60%' }}>
                        <Input
                            width={'100%'}
                            value={description}
                            onChange={(e) => handleChangeDescription(e)}
                        />
                    </Col>
                </Row>

                <Row>
                    {idNumber && (
                        <Col style={{ margin: 10 }}>
                            <Popconfirm
                                title="Удалить ед.измерения!"
                                description="Вы уверены что хотите удалить?"
                                onConfirm={() => confirm}
                                onCancel={() => cancel}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button danger>Удалить список</Button>
                            </Popconfirm>
                        </Col>
                    )}
                </Row>
            </Row>
        </Row>
    );
};

export default MainNameWork;
