import { Button, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { listNameWorkApi } from 'src/shared/api';
import { delList } from 'src/shared/models';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';

interface DataType {
    index: number;
    key: string;
    name: string;
    number: number;
    description: string;
    action: number;
}

const TableSelected = () => {
    const dispatch = useAppDispatch();
    const [unpin] = listNameWorkApi.useUnpinListMutation();
    const { isLoading, selectedScopeWorkById } = useAppSelector(
        (store) => store.scopeWork
    );

    let listNameWorkFinish;

    if (selectedScopeWorkById) {
        const { listNameWork } = selectedScopeWorkById;
        listNameWorkFinish = listNameWork;
    }

    if (isLoading) {
        return <Spin />;
    }
    const handleUnpin = (num: number) => {
        if (selectedScopeWorkById.id !== null) {
            unpin({
                id: num,
                scopeWorkId: selectedScopeWorkById.id,
            }).then(() => {
                if (selectedScopeWorkById.id !== null) {
                    dispatch(
                        delList({
                            id: num,
                            idScopeWork: selectedScopeWorkById.id,
                        })
                    );
                }
            });
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
            render: (num) => (
                <Link
                    to={`${process.env.REACT_APP_URL_API_LOCAL}/admin/object/list/listItem/${num}`}
                >
                    {num}
                </Link>
            ),
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (num) => (
                <>
                    {selectedScopeWorkById.id !== null ? (
                        <Button danger onClick={() => handleUnpin(num)}>
                            Открепить
                        </Button>
                    ) : null}
                </>
            ),
        },
    ];

    const data = listNameWorkFinish?.map((item, index) => {
        const { id, name, description } = item;

        return {
            key: id.toString(),
            index: index + 1,
            number: id,
            name: name ?? '',
            description: description ?? '',
            action: id,
        } as DataType;
    });

    return <Table columns={columns} dataSource={data} />;
};

export default TableSelected;
