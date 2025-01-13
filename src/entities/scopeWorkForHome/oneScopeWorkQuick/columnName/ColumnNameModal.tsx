import { Alert, Button, Col, Input, Modal, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { nameListApi } from 'src/shared/api';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { setModal, setQuntity } from 'src/shared/models';
const { Text } = Typography;

interface IColumnNameModalProps {
    refetch: () => void;
}

const ColumnNameModal: React.FC<IColumnNameModalProps> = ({ refetch }) => {
    const dispatch = useAppDispatch();
    const { open, nameListId, quntity, name } = useAppSelector(
        (store) => store.scopeWork.helpersScopeWork.columnNameModal
    );
    const { isLoading } = nameListApi.useGetNameListQuery(
        {
            id: nameListId || 0,
        },
        { skip: !nameListId }
    );

    const [updateNameList, { isLoading: isLoadingUpdate, isError, isSuccess }] =
        nameListApi.useUpdateNameListMutation();

    const [isSuccessMutate, setIsSuccess] = useState<boolean>();

    useEffect(() => {
        if (isSuccess) {
            setIsSuccess(isSuccess);
            refetch();
        }
    }, [isSuccess]);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = value
            .replace(',', '.')
            .replace(/[^0-9.]/g, '')
            .replace(/^0+(?=[1-9])/, '');

        dispatch(setQuntity(formattedValue));
    };

    const handleSave = async () => {
        if (nameListId && quntity !== null) {
            await updateNameList({
                nameListId: nameListId,
                quntity: +quntity,
            });
        }
    };
    const handleCancel = () => {
        dispatch(setModal(!open));
        setIsSuccess(false);
    };

    return (
        <Row>
            {isLoading ? (
                <Spin />
            ) : (
                <Modal
                    title="Редактирование количества"
                    centered
                    open={open}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Text italic>{name}</Text>
                    <Row style={{ margin: '10px 0' }}>
                        <Col>
                            <Text strong>Количество:</Text>
                            <Input
                                type="text"
                                value={quntity ? quntity : ''}
                                onChange={handleEdit}
                            />
                        </Col>
                    </Row>
                    {isSuccessMutate && (
                        <Row style={{ margin: '10px 0' }}>
                            <Alert message="Успешно" type="success" showIcon />
                        </Row>
                    )}
                    {isError && (
                        <Row style={{ margin: '10px 0' }}>
                            <Alert
                                message="Произошла ошибка"
                                type="error"
                                showIcon
                            />
                        </Row>
                    )}
                    {isLoadingUpdate ? (
                        <Spin />
                    ) : (
                        <Row>
                            <Button onClick={handleSave}>Сохранить</Button>
                        </Row>
                    )}
                </Modal>
            )}
        </Row>
    );
};

export default ColumnNameModal;
