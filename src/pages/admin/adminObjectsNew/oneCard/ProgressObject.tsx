import { Col } from 'antd';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { IObjectInfoDto } from 'src/shared/interfaces/models';

export interface IProgressObject {
    data: IObjectInfoDto[];
}

const ProgressObject: React.FC<IProgressObject> = ({ data }) => {
    const newData = data.map((item) => {
        return {
            Сумма: item.quntity,
            Год_Месяц: `${item.year}-${item.monthName}`,
        };
    });

    return (
        <Col>
            <LineChart
                width={500}
                height={400}
                data={newData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Год_Месяц" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Сумма"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </Col>
    );
};

export default ProgressObject;
