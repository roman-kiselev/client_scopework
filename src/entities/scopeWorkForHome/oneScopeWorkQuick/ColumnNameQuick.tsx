import {
    DeleteOutlined,
    InfoCircleOutlined,
    UnorderedListOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Button, Col, Popover, Progress, Row, Space, Spin, Tag } from 'antd';
import React, { useState } from 'react';
import { tableAddingDataApi, unitsApi } from 'src/shared/api';
import { RoleString } from 'src/shared/config';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { checkRole } from 'src/shared/utils';
import DrawerTimelineNameWork from '../oneScopeWork/DrawerTimelineNameWork';

interface IColumnNameQuickProps {
    name: string;
    nameListId: number;
    nameWorkId: number;
    scopeWorkId: number;
    percent: number;
    unitName: string;
    refetch: any;
    isLoading: boolean;
    remainderQuntity: number;
    isDel: boolean;
    quantitySum: number;
    verfulfilment: number;
    unitId: number;
}

const ColumnNameQuick: React.FC<IColumnNameQuickProps> = ({
    name,
    nameListId,
    nameWorkId,
    scopeWorkId,
    percent,
    unitName,
    refetch,
    isLoading,
    remainderQuntity,
    isDel,
    quantitySum,
    verfulfilment,
    unitId,
}) => {
    const dispatch = useAppDispatch();

    const { roles } = useAppSelector((store) => store.auth);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();
    const { data: dataTimeline, refetch: refetchTimeline } =
        tableAddingDataApi.useHistoryForNameQuery({
            nameListId,
            nameWorkId,
            scopeWorkId: Number(scopeWorkId),
        });

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleClickQuery = async () => {
        // await dispatch(
        //     tableAddingDataApi.endpoints.historyForName.initiate({
        //         nameListId,
        //         nameWorkId,
        //         scopeWorkId: Number(scopeWorkId),
        //     })
        // )
        //     .unwrap()
        //     .then((data) => {
        //         setDataTimeline(data);
        //     });

        refetchTimeline();
    };

    const handleClick = async () => {
        handleClickQuery();
        showDrawer();
    };

    return (
        <>
            <DrawerTimelineNameWork
                dataTimeline={dataTimeline || []}
                dataUnit={dataUnit || []}
                name={name}
                onClose={onClose}
                open={open}
                roles={roles}
                nameListId={nameListId}
                nameWorkId={nameListId}
                scopeWorkId={Number(scopeWorkId)}
                handleClickQuery={handleClickQuery}
                refetch={refetch}
                isLoading={isLoading}
                unitName={unitName}
                unitId={unitId}
            />
            <>
                <Col>
                    <p>{name}</p>
                </Col>
                <Row>
                    <Space>
                        <Col>
                            {checkRole(roles, RoleString.MASTER) ||
                            checkRole(roles, RoleString.ADMIN) ? (
                                <Tag color="red">
                                    Ост. {remainderQuntity} {unitName || `ед.`}
                                </Tag>
                            ) : null}
                        </Col>
                        <Col>
                            {isDel ? (
                                <Popover
                                    content={<p>Есть заявки на удаление</p>}
                                >
                                    <DeleteOutlined style={{ color: 'red' }} />
                                </Popover>
                            ) : null}
                        </Col>
                        <Col>
                            <Button onClick={handleClick} size="small">
                                <UnorderedListOutlined />
                            </Button>
                        </Col>
                        <Col>
                            <Popover
                                content={
                                    <Row>
                                        <Col>
                                            {/* <p>
                                        Общий процент выполнения:{' '}
                                        {totalPercentage}%
                                    </p> */}
                                            <p>
                                                Осталось выполнить:{' '}
                                                {remainderQuntity} ед.
                                            </p>
                                            {verfulfilment > 0 &&
                                                `Перевыполнено: ${verfulfilment} ед.`}
                                        </Col>
                                    </Row>
                                }
                                title="Доп.инфо."
                                trigger="click"
                            >
                                <Button>
                                    <InfoCircleOutlined
                                        style={{ color: 'brown' }}
                                    />
                                </Button>
                            </Popover>
                        </Col>
                        <Col>
                            {verfulfilment > 0 && (
                                <Popover content={<p>Есть перевыполнение</p>}>
                                    <WarningOutlined
                                        style={{ color: 'orange' }}
                                    />
                                </Popover>
                            )}
                        </Col>
                    </Space>
                </Row>

                {isLoading && <Spin />}

                {percent !== undefined && Number(percent) > 100 ? (
                    <Progress
                        percent={Number(percent)}
                        strokeColor="yellow"
                        status={'success'}
                    />
                ) : (
                    <Progress
                        percent={Number(percent)}
                        status={
                            percent === undefined || Number(percent) < 100
                                ? 'active'
                                : 'success'
                        }
                    />
                )}
            </>
        </>
    );
};

export default ColumnNameQuick;
