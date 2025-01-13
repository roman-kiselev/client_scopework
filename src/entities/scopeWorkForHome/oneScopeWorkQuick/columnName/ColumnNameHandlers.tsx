import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
    UnorderedListOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Button, Col, Popover, Row, Space, Tag } from 'antd';
import { RoleString } from 'src/shared/config';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import {
    setModal,
    setNameListId,
    setStateDrawerTimeline,
} from 'src/shared/models';
import { checkRole } from 'src/shared/utils';
import { IColumnNameHandlersProps } from '../interfaces/IColumnNameHandlersProps';

const ColumnNameHandlers: React.FC<IColumnNameHandlersProps> = ({
    nameListId,
    nameWorkId,
    name,
    unitName,
    remainderQuntity,
    isDel,
    verfulfilment,
}) => {
    const dispatch = useAppDispatch();
    const { roles } = useAppSelector((store) => store.auth);
    const { open } = useAppSelector(
        (store) => store.scopeWork.helpersScopeWork.columnNameModal
    );

    const { stateDrawerTimeline } = useAppSelector(
        (store) => store.scopeWork.helpersScopeWork.drawerTimeline
    );

    const handleShowEdit = () => {
        dispatch(setModal(!open));
        dispatch(setNameListId(nameListId));
    };

    const handleShowDrawer = () => {
        dispatch(
            setStateDrawerTimeline({
                stateDrawerTimeline: !stateDrawerTimeline,
                nameListId: nameListId,
                nameWorkId: nameWorkId,
                name: name,
                unitName: unitName,
            })
        );
    };

    return (
        <Space>
            <Col>
                {checkRole(roles, RoleString.MASTER) ||
                checkRole(roles, RoleString.ADMIN) ? (
                    <Tag color="red">
                        Ост.{' '}
                        {remainderQuntity ? remainderQuntity.toFixed(2) : 0.0}{' '}
                        {unitName || `ед.`}
                    </Tag>
                ) : null}
            </Col>
            <Col>
                {isDel ? (
                    <Popover content={<p>Есть заявки на удаление</p>}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popover>
                ) : null}
            </Col>
            <Col>
                {checkRole(roles, RoleString.ADMIN) && (
                    <Button
                        style={{ color: 'blue' }}
                        size="small"
                        onClick={handleShowEdit}
                    >
                        <EditOutlined style={{ color: 'orangered' }} />
                    </Button>
                )}
            </Col>
            <Col>
                <Button onClick={handleShowDrawer} size="small">
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
                                    Осталось выполнить: {remainderQuntity} ед.
                                </p>
                                {verfulfilment > 0 &&
                                    `Перевыполнено: ${verfulfilment} ед.`}
                            </Col>
                        </Row>
                    }
                    title="Доп.инфо."
                    trigger="click"
                >
                    <Button size="small">
                        <InfoCircleOutlined style={{ color: 'brown' }} />
                    </Button>
                </Popover>
            </Col>
            <Col>
                {verfulfilment > 0 && (
                    <Popover content={<p>Есть перевыполнение</p>}>
                        <WarningOutlined style={{ color: 'orange' }} />
                    </Popover>
                )}
            </Col>
        </Space>
    );
};

export default ColumnNameHandlers;
