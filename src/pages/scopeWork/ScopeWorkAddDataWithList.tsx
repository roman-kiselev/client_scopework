import { Button, Collapse, CollapseProps, Row } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { OneScopeWorkForEditQuickTab } from 'src/entities';
import { newUserApi, scopeWorkApi } from 'src/shared/api';
import { useAppSelector } from 'src/shared/hooks';

const ScopeWorkAddDataWithList = () => {
    const { id } = useParams();
    const { banned } = useAppSelector((store) => store.auth);

    const { isLoading: isLoadingUser } = newUserApi.useGetAllUserListQuery();

    const { data, refetch } = scopeWorkApi.useQuickWithGroupQuery(
        {
            id: id && !banned ? id : '0',
        },
        {
            skip: !id,
        }
    );

    // const items: CollapseProps['items'] = [
    //     {
    //       key: '1',
    //       label: 'This is panel header 1',
    //       children: <p>{text}</p>,
    //     },
    //     {
    //       key: '2',
    //       label: 'This is panel header 2',
    //       children: <p>{text}</p>,
    //     },
    //     {
    //       key: '3',
    //       label: 'This is panel header 3',
    //       children: <p>{text}</p>,
    //     },
    //   ];

    const items: CollapseProps['items'] = data?.map((item) => {
        return {
            key: item.id.toString(),
            label: `${item.name} ${item.description}`,
            children: (
                <OneScopeWorkForEditQuickTab
                    idScopeWork={item.scopeWorkId}
                    list={item.list}
                    refetch={refetch}
                />
            ),
        };
    });

    // const onChange = (key: string | string[]) => {
    //     console.log(key);
    // };

    return (
        <>
            <Row>
                <Link to={`/${id}`}>
                    <Button>Вернуться к виду</Button>
                </Link>
            </Row>
            <Collapse
                items={items}
                defaultActiveKey={['1']}
                // onChange={onChange}
            />
        </>
    );
};

export default ScopeWorkAddDataWithList;
