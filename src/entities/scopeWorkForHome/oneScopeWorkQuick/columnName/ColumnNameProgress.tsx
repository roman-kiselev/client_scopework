import { Progress, Spin } from 'antd';
import { IColumnNameProgressProps } from '../interfaces/IColumnNameProgress';

const ColumnNameProgress: React.FC<IColumnNameProgressProps> = ({
    isLoading,
    percent,
}) => {
    return (
        <>
            {isLoading && <Spin />}

            {percent !== undefined && Number(percent) > 100 ? (
                <Progress
                    percent={Number(percent)}
                    strokeColor="yellow"
                    status={'success'}
                />
            ) : (
                <Progress
                    percent={Number(percent)}
                    status={
                        percent === undefined || Number(percent) < 100
                            ? 'active'
                            : 'success'
                    }
                />
            )}
        </>
    );
};

export default ColumnNameProgress;
