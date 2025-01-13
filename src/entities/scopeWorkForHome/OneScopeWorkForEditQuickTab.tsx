import { Col, Input } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import {
    IResQuickOneScopeWorkById,
    IValueForListData,
} from 'src/shared/interfaces';
import ColumnNameQuick from './oneScopeWorkQuick/ColumnNameQuick';
import ColumnQuntityQuick from './oneScopeWorkQuick/ColumnQuntityQuick';

interface IOneScopeWorkForEditQuickTabProps {
    idScopeWork: number;
    list: IResQuickOneScopeWorkById[];
    refetch?: () => void;
}

const OneScopeWorkForEditQuickTab: React.FC<
    IOneScopeWorkForEditQuickTabProps
> = ({ list, idScopeWork, refetch }) => {
    const [searchedText, setSearchedText] = useState('');

    const dataValue = list?.map((item) => {
        return {
            idNameWork: item.nameWorkId,
            listNameWorkId: item.listNameWorkId,
            value: '',
        } as IValueForListData;
    });

    const [dataList, setDataList] = useState<IValueForListData[]>(
        dataValue || []
    );

    const [dataForTable, setDataForTable] = useState<
        IResQuickOneScopeWorkById[]
    >([]);

    useEffect(() => {
        const dataValue = list.map((item) => {
            return {
                idNameWork: item.nameWorkId,
                value: '',
                listNameWorkId: item.listNameWorkId,
            } as IValueForListData;
        });

        const dataForTable = list.map((item, index) => {
            return {
                ...item,
                key: (index + 1).toString(),
                index: (index + 1).toString(),
            };
        });

        setDataList(dataValue || []);
        setDataForTable(dataForTable || []);
    }, [list]);

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
                    listNameWorkId,
                    nameListId,
                    quantity,
                    quantitySum,
                    remains,
                    verfulfilment,
                    unitId,
                }
            ) => (
                <ColumnNameQuick
                    isLoading={false}
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

                // <ColumnName
                //     count={quntityMain}
                //     name={name}
                //     percent={percent}
                //     quntity={quntity}
                //     unitId={unitId}
                //     isLoading={isLoading}
                //     nameListId={nameListId}
                //     nameWorkId={nameWorkId}
                //     scopeWorkId={scopeWorkId}
                //     refetch={refetch}
                // />
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
                // <ColumnQuntity
                //     dataList={dataList}
                //     listNameWorkId={listNameWorkId}
                //     nameListId={nameListId}
                //     nameWorkId={nameWorkId}
                //     scopeWorkId={scopeWorkId}
                //     setDataList={setDataList}
                //     refetch={refetch}
                // />
            ),
        },
    ];

    return (
        <Col>
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

export default OneScopeWorkForEditQuickTab;
