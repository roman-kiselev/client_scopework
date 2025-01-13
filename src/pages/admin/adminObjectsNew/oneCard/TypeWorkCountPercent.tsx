import { Col, Spin } from 'antd';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { objectsApi } from 'src/shared/api';

interface INewData {
    name: string;
    quntity: number;
    value: number;
}

export interface ITypeWorkCountPercent {
    objectId: number;
}

const TypeWorkCountPercent: React.FC<ITypeWorkCountPercent> = ({
    objectId,
}) => {
    const { data, isLoading } = objectsApi.useGetAllDataRechartsTypeWorkQuery(
        {
            objectId,
        },
        {
            skip: !objectId,
        }
    );

    if (isLoading) {
        return <Spin />;
    }

    const newData: INewData[] = [];
    data?.data.forEach((item) => {
        if (item) {
            newData.push({
                name: item.typeWorkName,
                quntity: item.quntity,
                value: item.percent,
            });
        }
    });

    const POPULAR_COLORS = [
        '#1f77b4', // muted blue
        '#ff7f0e', // orange
        '#2ca02c', //  green
        '#d62728', // red
        '#9467bd', // purple
        '#8c564b', // brown
        '#e377c2', // pinkish-red
        '#7f7f7f', // gray
        '#bcbd22', //  yellow-green
        '#17becf', // light blue
    ];

    return (
        <Col>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h4>Процент типов работ от объёма</h4>
            </Col>

            {newData && (
                <PieChart width={500} height={300}>
                    <Pie
                        data={newData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                        labelLine
                        direction="top"
                    >
                        {newData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    POPULAR_COLORS[
                                        index % POPULAR_COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}
        </Col>
    );
};

export default TypeWorkCountPercent;
