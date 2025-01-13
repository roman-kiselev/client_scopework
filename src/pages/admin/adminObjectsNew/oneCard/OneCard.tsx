import { Card, Row } from 'antd';
import { IObjectRechartsDataDto } from 'src/shared/interfaces/models';
import ProgressObject from './ProgressObject';
import TypeWorkCountPercent from './TypeWorkCountPercent';
import UserCountPercent from './UserCountPercent';

export interface IOneCard {
    data: IObjectRechartsDataDto;
}

const OneCard: React.FC<IOneCard> = ({ data }) => {
    return (
        <Card
            style={{ marginTop: 10 }}
            type="inner"
            title={data.name}
            extra={<a href="#">Перейти</a>}
        >
            <Row>
                <ProgressObject data={data.data} />
                <TypeWorkCountPercent objectId={data.id} />
                <UserCountPercent objectId={data.id} />
            </Row>
        </Card>
    );
};

export default OneCard;
