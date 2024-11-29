import {
    DeleteOutlined,
    InfoCircleOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Button, Col, Popover, Progress, Row, Space, Spin } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleString } from 'src/shared/config';
import {
    resetFilteringOptions,
    setOnlyNotCompleted,
} from 'src/shared/models/scopeWork';
import { ButtonExcelWithParams, ModalDownloadScopework } from 'src/shared/ui';
import FilterForScopeWork from 'src/shared/ui/filter/FilterForScopeWork';
import { checkRole } from 'src/shared/utils';
import { scopeWorkApi } from '../../shared/api';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

interface DataType {
    key: string;
    number: string;
    typeWork: string;
    object: string;
    progress: string;
    action: string;
    sum: number;
    sumCurrent: number;
    totalPercentage: number;
    remains: number;
    verfulfilment: number;
    isDel: boolean;
}

// const columns: ColumnsType<DataType> = [
//     {
//         title: "№",
//         dataIndex: "number",
//         key: "number",
//         render: (num) => (
//             <>
//                 <Space>
//                     <Link to={`/${num}`}>{num}</Link>
//                     <ButtonExcel handleClick={handleClickShowModal} />
//                 </Space>
//             </>
//         ),
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//     },
//     {
//         title: "Тип работ",
//         dataIndex: "typeWork",
//         key: "typeWork",
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//         render: (_: any, { typeWork, number }) => (
//             <Link to={`/${number}`}>{typeWork}</Link>
//         ),
//     },
//     {
//         title: "Объект",
//         dataIndex: "object",
//         key: "object",
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//     },
//     {
//         title: "Прогресс",
//         dataIndex: "progress",
//         key: "progress",
//         responsive: ["lg"],
//         render: (_: any, { progress }) => (
//             <>
//                 {progress !== undefined && Number(progress) > 100 ? (
//                     <Progress
//                         percent={Number(progress)}
//                         strokeColor="yellow"
//                         status={"success"}
//                     />
//                 ) : (
//                     <Progress
//                         percent={Number(progress)}
//                         status={
//                             progress === undefined || Number(progress) < 100
//                                 ? "active"
//                                 : "success"
//                         }
//                     />
//                 )}
//             </>
//         ),
//     },
//     {
//         title: "Действие",
//         key: "action",
//         render: (_: any, { number }) => (
//             <Space size="middle">
//                 <Link to={`/${number}`}>Перейти</Link>
//             </Space>
//         ),
//         responsive: ["lg"],
//     },
// ];

const ScopeWorkForHome = () => {
    const dispatch = useAppDispatch();
    const { id, banned, roles } = useAppSelector((store) => store.auth);
    const { objectName, onlyCompleted, onlyNotCompleted, typeWorkName, isDel } =
        useAppSelector((store) => store.scopeWork.filteringOptions.home);

    const [selectedId, setSelectedId] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const { data, isLoading, refetch } = scopeWorkApi.useGetShortSqlQuery(
        {
            objectName: objectName,
            typeWorkName: typeWorkName,
            onlyCompleted: onlyCompleted,
            onlyNotCompleted: onlyNotCompleted,
            isDel: isDel,
        },
        {
            skip: !id || banned,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    useEffect(() => {
        dispatch(resetFilteringOptions());
        dispatch(setOnlyNotCompleted(true));
    }, []);
    const handleClickShowModal = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleCancelModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            render: (num) => (
                <>
                    <Link to={`/${num}`}>{num}</Link>
                </>
            ),
            responsive: ['sm', 'lg', 'md', 'xl', 'xs'],
        },
        {
            title: 'Тип работ',
            dataIndex: 'typeWork',
            key: 'typeWork',
            responsive: ['sm', 'lg', 'md', 'xl', 'xs'],
            render: (
                _: any,
                {
                    typeWork,
                    number,
                    totalPercentage,
                    remains,
                    verfulfilment,
                    isDel,
                }
            ) => (
                <Space>
                    <Link to={`/${number}`}>{typeWork}</Link>
                    {checkRole(roles, RoleString.ADMIN) && (
                        <ButtonExcelWithParams
                            id={number}
                            handleClick={handleClickShowModal}
                        />
                    )}
                    <Popover
                        content={
                            <Row>
                                <Col>
                                    <p>
                                        Общий процент выполнения:{' '}
                                        {totalPercentage}%
                                    </p>
                                    <p>Осталось выполнить: {remains} ед.</p>
                                    {verfulfilment > 0 &&
                                        `Перевыполнено: ${verfulfilment} ед.`}
                                </Col>
                            </Row>
                        }
                        title="Доп.инфо."
                        trigger="click"
                    >
                        <Button>
                            <InfoCircleOutlined style={{ color: 'brown' }} />
                        </Button>
                    </Popover>

                    {verfulfilment > 0 && (
                        <Popover content={<p>Есть перевыполнение</p>}>
                            <WarningOutlined style={{ color: 'orange' }} />
                        </Popover>
                    )}
                    {checkRole(roles, RoleString.ADMIN) && isDel ? (
                        <Popover content={<p>Есть заявки на удаление</p>}>
                            <DeleteOutlined style={{ color: 'red' }} />
                        </Popover>
                    ) : null}
                </Space>
            ),
        },
        {
            title: 'Объект',
            dataIndex: 'object',
            key: 'object',
            responsive: ['sm', 'lg', 'md', 'xl', 'xs'],
        },
        {
            title: 'Прогресс',
            dataIndex: 'progress',
            key: 'progress',
            responsive: ['lg'],
            render: (_: any, { progress }) => (
                <>
                    {progress !== undefined && Number(progress) > 100 ? (
                        <Progress
                            percent={Number(progress)}
                            strokeColor="yellow"
                            status={'success'}
                        />
                    ) : (
                        <Progress
                            percent={Number(progress)}
                            status={
                                progress === undefined || Number(progress) < 100
                                    ? 'active'
                                    : 'success'
                            }
                        />
                    )}
                </>
            ),
        },
        {
            title: 'Действие',
            key: 'action',
            render: (_: any, { number }) => (
                <Space size="middle">
                    <Link to={`/${number}`}>Перейти</Link>
                </Space>
            ),
            responsive: ['lg'],
        },
    ];

    const dataForTable = data?.map((item) => ({
        key: item.id.toString() ?? '',
        number: item.id.toString() ?? '',
        action: item.id.toString() ?? '',
        progress: item.percent !== null ? `${item.percent}` : '0',
        object: `${item.nameObject}`,
        typeWork: `${item.nameTypeWork}`,
        remains: item.remains,
        sum: item.sum,
        sumCurrent: item.sumCurrent,
        totalPercentage: item.totalPercentage,
        verfulfilment: item.verfulfilment,
        isDel: item.isDel,
    }));

    if (isLoading) {
        return <Spin />;
    }

    if (banned) {
        return <p>Нет доступа</p>;
    }
    return (
        <>
            <FilterForScopeWork refetch={refetch} />
            <Row>
                <ModalDownloadScopework
                    idScopeWork={selectedId}
                    handleCancel={handleCancelModal}
                    open={open}
                />
            </Row>
            <Row style={{ marginBottom: 10 }}>
                <h2>Доступные работы</h2>
            </Row>
            <Table size="small" columns={columns} dataSource={dataForTable} />
        </>
    );
};

export default ScopeWorkForHome;
