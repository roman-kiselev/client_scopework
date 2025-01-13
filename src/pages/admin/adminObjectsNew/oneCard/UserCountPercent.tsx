import { Col, Tooltip } from 'antd';
import React from 'react';
import { Cell, Legend, Pie, PieChart } from 'recharts';
export interface IUserCountPercent {
    objectId: number;
}
const UserCountPercent: React.FC<IUserCountPercent> = ({ objectId }) => {
    const data2 = [
        { name: 'Водоснабжение', value: 400 },
        { name: 'Отопление', value: 300 },
        { name: 'Канализация', value: 200 },
        { name: 'АСКУЭ', value: 500 },
    ];
    // Набор цветов
    const COLORS = [
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#ff8042',
        '#888888',
        '#82ca9d',
        '#8884d8',
    ];

    return (
        <Col>
            <PieChart width={500} height={300}>
                <Pie
                    data={data2}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data2.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Col>
    );
};

export default UserCountPercent;
