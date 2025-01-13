import { Card, Pagination, Row, Spin } from 'antd';
import { useState } from 'react';
import { objectsApi } from 'src/shared/api';
import OneCard from './oneCard/OneCard';

const MainPage = () => {
    const [pagination, setPagination] = useState(1);
    const { data, isLoading } = objectsApi.useGetAllDataRechartsProgressQuery({
        limit: 2,
        offset: pagination,
    });

    if (isLoading) <Spin />;

    return (
        <Card title="Объекты">
            {data &&
                data.rows.map((object) => (
                    <OneCard key={object.name} data={object} />
                ))}

            {data && (
                <Row style={{ marginTop: 16 }}>
                    <Pagination
                        defaultCurrent={pagination}
                        onChange={setPagination}
                        total={data.count}
                        defaultPageSize={2}
                    />
                </Row>
            )}
        </Card>
    );
};

export default MainPage;
