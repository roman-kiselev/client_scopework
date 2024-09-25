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

    useEffect(() => {
        const dataValue = list.map((item) => {
            return {
                idNameWork: item.nameWorkId,
                value: '',
                listNameWorkId: item.listNameWorkId,
            } as IValueForListData;
        });

        setDataList(dataValue || []);
    }, [list]);

    const dataForTable = list.map((item, index) => {
        return {
            ...item,
            key: (index + 1).toString(),
            index: (index + 1).toString(),
        };
    });

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
                    id,
                    name,
                    nameWorkId,
                    percent,
                    quntityMain,
                    remainderQuntity,
                    unitName,
                    unitId,
                }
            ) => (
                <ColumnNameQuick
                    isLoading={false}
                    name={name}
                    nameListId={id}
                    nameWorkId={nameWorkId}
                    percent={percent ? percent : 0}
                    scopeWorkId={idScopeWork ? +idScopeWork : 0}
                    refetch={refetch}
                    remainderQuntity={
                        remainderQuntity !== null
                            ? remainderQuntity
                            : quntityMain || 0
                    }
                    unitId={unitId}
                    unitName={unitName}
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
            render: (_: any, { id, nameWorkId, listNameWorkId }) => (
                <ColumnQuntityQuick
                    nameListId={id}
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
