import { Button, Col, Input, Row, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { newUserApi, scopeWorkApi } from 'src/shared/api';
import { useAppSelector } from 'src/shared/hooks';
import { IValueForListData } from 'src/shared/interfaces';
import { IResQuickOneScopeWorkById } from 'src/shared/interfaces/api';
import ColumnNameQuick from './oneScopeWorkQuick/ColumnNameQuick';
import ColumnQuntityQuick from './oneScopeWorkQuick/ColumnQuntityQuick';

const OneScopeWorkForEditQuick = () => {
    const { id: idScopeWork } = useParams();
    const { banned } = useAppSelector((store) => store.auth);

    const { isLoading: isLoadingUser } = newUserApi.useGetAllUserListQuery();

    const {
        data: scopeWorkDataQuick,
        isLoading,
        refetch,
    } = scopeWorkApi.useQuickOneScopeWorkByIdQuery(
        {
            id:
                idScopeWork !== undefined && !banned
                    ? idScopeWork.toString()
                    : '0',
        },
        { skip: !idScopeWork, refetchOnMountOrArgChange: true }
    );

    const [searchedText, setSearchedText] = useState('');
    const dataValue = scopeWorkDataQuick?.map((item) => {
        return {
            idNameWork: item.nameWorkId,
            listNameWorkId: item.listNameWorkId,
            value: '',
        } as IValueForListData;
    });

    const [dataList, setDataList] = useState<IValueForListData[]>(
        dataValue || []
    );

    const [dataForTable, setDataForTable] = useState<any[]>([]);

    useEffect(() => {
        const dataValue = scopeWorkDataQuick?.map((item) => {
            return {
                idNameWork: item.nameWorkId,
                value: '',
                listNameWorkId: item.listNameWorkId,
            } as IValueForListData;
        });
        const arr = scopeWorkDataQuick?.map((item, index) => {
            return {
                ...item,
                key: (index + 1).toString(),
                index: (index + 1).toString(),
            };
        });

        setDataForTable(arr ?? []);
        setDataList(dataValue || []);
    }, [idScopeWork, scopeWorkDataQuick]);

    if (isLoading || isLoadingUser) {
        return <Spin />;
    }

    const columns: ColumnsType<IResQuickOneScopeWorkById> = [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchedText],
            onFilter: (value: any, record: any) => {
                return String(record.name)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: (
                _: any,
                {
                    name,
                    nameWorkId,
                    percent,
                    unitName,
                    isDel,
                    nameListId,
                    quantity,
                    quantitySum,
                    remains,
                    verfulfilment,
                    unitId,
                }
            ) => (
                <ColumnNameQuick
                    isLoading={isLoading}
                    name={name}
                    nameListId={nameListId}
                    nameWorkId={nameWorkId}
                    percent={percent ? percent : 0}
                    scopeWorkId={idScopeWork ? +idScopeWork : 0}
                    refetch={refetch}
                    remainderQuntity={
                        remains !== null ? remains : quantity || 0
                    }
                    unitName={unitName}
                    isDel={isDel}
                    quantitySum={quantitySum}
                    verfulfilment={verfulfilment}
                    unitId={unitId}
                />
            ),
        },
        {
            title: 'Количество',
            dataIndex: 'quntity',
            key: 'quntity',
            render: (_: any, { nameListId, nameWorkId, listNameWorkId }) => (
                <ColumnQuntityQuick
                    nameListId={nameListId}
                    data={dataList}
                    listNameWorkId={listNameWorkId}
                    scopeWorkId={idScopeWork?.toString() || '0'}
                    nameWorkId={nameWorkId}
                    refetch={refetch}
                    setDataList={setDataList}
                />
            ),
        },
    ];

    return (
        <Col>
            <Row>
                <Link to={`/${idScopeWork}/list`}>
                    <Button>Изменить вид</Button>
                </Link>
            </Row>
            <Col style={{ maxWidth: '300px' }}>
                <Input.Search
                    placeholder="Поиск ..."
                    style={{ margin: '10px 0' }}
                    onSearch={(value) => {
                        setSearchedText(value);
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchedText(e.target.value);
                    }}
                />
            </Col>

            <Table size="small" dataSource={dataForTable} columns={columns} />
        </Col>
    );
};

export default OneScopeWorkForEditQuick;
