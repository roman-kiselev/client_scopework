import { Spin } from 'antd';
import { ListInfiniteShort, OneObjectShort } from '../../entities';
import { objectsApi } from '../../shared/api';
import { useAppSelector } from '../../shared/hooks';

const ListInfiniteShortFeatures = () => {
    const { isLoading } = objectsApi.useGetAllObjectsQuery();
    if (isLoading) <Spin />;
    const { listObject } = useAppSelector((state) => state.objects);
    return (
        <ListInfiniteShort data={listObject}>
            {listObject.map((object) => (
                <OneObjectShort object={object} key={object.id} />
            ))}
        </ListInfiniteShort>
    );
};

export default ListInfiniteShortFeatures;
